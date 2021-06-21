import React, { useContext } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import appContext from '../../context/appContext'

import { Home, Search, User } from 'react-feather'

const BottomNavStyle = styled.div`
    background-color: white;
    padding: 20px 0px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9991;
    box-shadow: 0px -4px 8px 2px rgba(17, 17, 17, 0.1);

    button {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: transparent;
        }

        &.active {
            &::before {
                background-color: #111;
            }
        }
    }

    @media only screen and (min-width: 1025px) {
        display: none;
    }
`

export default function BottomNavigation({ active, user }) {
    const globalContext = useContext(appContext)

    const handleProfile = () => {
        if (user && user.hasOwnProperty('fullname')) {
            Router.push('/profile')
        } else {
            globalContext.toggleShowLogin(true)
        }
    }

    return (
        <BottomNavStyle>
            <div className='container'>
                <div className='d-flex align-items-center justify-content-around'>
                    <button
                        className={`${active === 'home' ? 'active' : ''} btn`}
                        onClick={() => Router.push('/')}>
                        <Home size={24} />
                    </button>
                    <button
                        className={`${active === 'search' ? 'active' : ''} btn`}
                        onClick={() => Router.push('/search')}>
                        <Search size={24} />
                    </button>
                    <button
                        className={`${active === 'user' ? 'active' : ''} btn`}
                        onClick={() => handleProfile()}>
                        <User size={24} />
                    </button>
                </div>
            </div>
        </BottomNavStyle>
    )
}
