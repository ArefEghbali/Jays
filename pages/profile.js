import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Topbar from '../Components/Topbar/Topbar'
import Footer from '../Components/Footer/Footer'
import styled from 'styled-components'
import prismaclient from '../utils/prismaclient'

import UserOrders from '../Components/Orders/UserOrders'

const ProfileTabs = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 40px;

    button {
        border-radius: 0px;
        border: none;
        border-bottom: 2px solid transparent;
        font-size: 24px;
        font-weight: 600;
        padding: 10px 20px;

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
                select: {
                    address: true,
                    id: true,
                    orderedAt: true,
                    status: true,
                    product: true,
                    total: true,
                },
            })

            let ongoing = orders.filter(
                (prevOrder) => prevOrder.status === 'OnGoing'
            )

            return {
                props: {
                    user: response.data.data,
                    ongoing: JSON.parse(JSON.stringify(ongoing)),
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

export default function profile({ user, ongoing }) {
    const [activeTab, setActiveTab] = useState('order')
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
                    <button className='btn'>Log Out</button>
                </ProfileTabs>
                <UserOrders orders={ongoing} title='OnGoing' defaultOpen />
                <UserOrders orders={[]} title='Completed' />
                <UserOrders orders={[]} title='Cancelled' />
            </div>
            <Footer />
        </div>
    )
}
