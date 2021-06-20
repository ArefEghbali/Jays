import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Topbar from '../Components/Topbar/Topbar'
import Footer from '../Components/Footer/Footer'
import styled from 'styled-components'

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
    // let token = req.cookies.token || ''

    // if (token !== '') {
    //     let response = await axios.get(
    //         `${process.env.BASE_API_URL}auth/verify`,
    //         {
    //             headers: {
    //                 authorization: token,
    //             },
    //         }
    //     )

    //     if (response.data.status === 200) {
    //         return {
    //             props: {
    //                 user: response.data.data,
    //             },
    //         }
    //     }
    // }

    // return {
    //     redirect: {
    //         destination: '/',
    //         permanent: false,
    //     },
    // }

    return {
        props: {
            user: {
                fullname: 'Aref Eghbali',
                uid: '1234',
            },
        },
    }
}

export default function profile({ user }) {
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
                <UserOrders orders={[]} title='OnGoing' defaultOpen />
                <UserOrders orders={[]} title='Completed' />
                <UserOrders orders={[]} title='Cancelled' />
            </div>
            <Footer />
        </div>
    )
}
