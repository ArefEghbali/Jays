import React, { useContext } from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Router from 'next/router'

import { Menu } from '@headlessui/react'

const Auth = dynamic(() => import('../Auth/Auth'))

import Cart from './Cart'
import appContext from '../../context/appContext'

import { User, Search, ChevronDown } from 'react-feather'
import axios from 'axios'

const TopbarStyle = styled(motion.nav)`
    background-color: white;
    position: sticky;
    top: 0px;
    height: 72px;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 5px 0px rgba(33, 33, 33, 0.15);
    z-index: 9990;
`

const TopbarMenus = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TopbarBrand = styled.a`
    font-size: 24px;
    color: #111;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
`

const TopbarSearch = styled.input`
    background-color: white;
    border: none;
    width: 500px;
`

export default function Topbar({ user, getSearchKey }) {
    const globalContext = useContext(appContext)

    const handleLogOut = () => {
        axios
            .get(`https://jaysneakers.herokuapp.com/api/auth/logout`)
            .then((response) => {
                if (response.data.status === 200) {
                    Router.replace('/')
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <TopbarStyle
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}>
            <div className='container'>
                <TopbarMenus>
                    <div className='d-flex align-items-center justify-content-start'>
                        <Link href='/'>
                            <TopbarBrand>Jays.</TopbarBrand>
                        </Link>
                        <Link href='/collection/women'>
                            <a className='ms-4 me-4 text-dark'>Women</a>
                        </Link>
                        <Link href='/collection/men'>
                            <a className='text-dark'>Men</a>
                        </Link>
                    </div>
                    <div className='d-lg-flex align-items-center justify-content-start d-none'>
                        <Search size={24} color='#474747' className='me-2' />
                        <TopbarSearch
                            placeholder='Search Sneakers...'
                            onChange={(e) =>
                                getSearchKey(e.currentTarget.value)
                            }
                        />
                    </div>
                    <div className='d-flex align-items-center justify-content-end'>
                        {(user && user.hasOwnProperty('firstName')) ||
                        user.hasOwnProperty('fullname') ? (
                            <Menu
                                as='div'
                                className='position-relative d-none d-lg-block'>
                                <Menu.Button className='btn d-flex align-items-center'>
                                    <User className='me-2' size={24} />
                                    {user.fullname ||
                                        `${user.firstName} ${user.lastName}`}
                                    <ChevronDown size={24} className='ms-2' />
                                </Menu.Button>
                                <Menu.Items className='topbar-user-profile'>
                                    <Menu.Item>
                                        <Link href='/profile'>
                                            <a className='btn d-block mt-2 w-100 text-start'>
                                                Profile
                                            </a>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            className='btn d-block mt-2 w-100 text-start'
                                            onClick={() => handleLogOut()}>
                                            Sign Out
                                        </button>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        ) : (
                            <button
                                className='btn d-none d-lg-flex'
                                onClick={() =>
                                    globalContext.toggleShowLogin(true)
                                }>
                                <User className='me-2' size={24} />
                                SignUp/Login
                            </button>
                        )}
                        <Cart globalContext={globalContext} />
                    </div>
                </TopbarMenus>
            </div>
            <Auth isOpen={globalContext.showLogin} />
        </TopbarStyle>
    )
}
