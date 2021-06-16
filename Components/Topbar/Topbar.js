import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { User, ShoppingCart, Search } from 'react-feather'

const TopbarStyle = styled(motion.nav)`
    background-color: white;
    position: sticky;
    top: 0;
    height: 72px;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 5px 0px rgba(33, 33, 33, 0.15);
    z-index: 9998;
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

export default function Topbar() {
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
                        <TopbarSearch placeholder='Search Sneakers...' />
                    </div>
                    <div className='d-flex align-items-center justify-content-end'>
                        <button className='btn d-none d-lg-flex'>
                            <User className='me-2' size={24} />
                            SignUp/Login
                        </button>
                        <button className='btn ms-4'>
                            <ShoppingCart size={24} />
                        </button>
                    </div>
                </TopbarMenus>
            </div>
        </TopbarStyle>
    )
}
