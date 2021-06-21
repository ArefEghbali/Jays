import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Topbar from '../Components/Topbar/Topbar'
import Footer from '../Components/Footer/Footer'
import styled from 'styled-components'
import prismaclient from '../utils/prismaclient'
import { motion, AnimatePresence } from 'framer-motion'
import Router from 'next/router'

import UserOrders from '../Components/Orders/UserOrders'
import Account from '../Components/Profile/Account'
import BottomNavigation from '../Components/BottomNavigation/BottomNavigation'

const ProfileTabs = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 40px;
    flex-wrap: nowrap;
    overflow-x: scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    button {
        flex: 1 0 auto;
        border-radius: 0px;
        border: none;
        border-bottom: 2px solid transparent;
        font-size: 24px;
        font-weight: 600;
        padding: 10px 20px;
        max-width: max-content;

        &.active {
            border-color: #111;
        }
    }
`

export async function getServerSideProps({ req, res }) {
    let token = req.cookies.token || ''

    if (token !== '') {
        let response = await axios.get(
            `${process.env.BASE_API_URL}auth/verify`,
            {
                headers: {
                    authorization: token,
                },
            }
        )

        if (response.data.status === 200) {
            let orders = await prismaclient.order.findMany({
                where: {
                    uid: response.data.data.pid,
                },
                include: {
                    products: {
                        include: {
                            product: {
                                select: {
                                    image: true,
                                    title: true,
                                },
                            },
                        },
                    },
                },
            })

            let ongoing = orders.filter(
                (prevOrder) => prevOrder.status === 'OnGoing'
            )

            let cancelled = orders.filter(
                (prevOrder) => prevOrder.status === 'Cancelled'
            )

            let currentUser = await prismaclient.user.findUnique({
                where: {
                    id: response.data.data.pid,
                },
            })

            return {
                props: {
                    user: JSON.parse(JSON.stringify(currentUser)),
                    ongoing: JSON.parse(JSON.stringify(ongoing)),
                    cancelled: JSON.parse(JSON.stringify(cancelled)),
                },
            }
        }
    }

    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    }
}

export default function profile({ user, ongoing, cancelled }) {
    const [activeTab, setActiveTab] = useState('order')

    const handleLogOut = () => {
        axios
            .get(`${process.env.BASE_API_URL}auth/logout`)
            .then((response) => {
                if (response.data.status === 200) {
                    Router.replace('/')
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Head>
                <title>Jays. | Profile</title>
            </Head>
            <Topbar user={user} />
            <div className='container min-vh-100'>
                <ProfileTabs>
                    <button
                        onClick={() => setActiveTab('order')}
                        className={`${
                            activeTab === 'order' ? 'active' : ''
                        } btn`}>
                        Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`${
                            activeTab === 'account' ? 'active' : ''
                        } btn`}>
                        Account
                    </button>
                    <button className='btn' onClick={() => handleLogOut()}>
                        Log Out
                    </button>
                </ProfileTabs>
                <AnimatePresence>
                    {activeTab === 'order' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}>
                            <UserOrders
                                orders={ongoing}
                                title='OnGoing'
                                defaultOpen
                            />
                            <UserOrders orders={[]} title='Completed' />
                            <UserOrders orders={cancelled} title='Cancelled' />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {activeTab === 'account' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}>
                            <Account user={user} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <BottomNavigation active='user' />
            <Footer />
        </div>
    )
}
