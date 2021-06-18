import React, { useState } from 'react'
import styled from 'styled-components'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import Login from './Login'
import Signup from './Signup'

const TabItem = styled.h4`
    font-weight: 600;
    width: 100%;
    text-align: center;
    padding: 10px 0px;
    cursor: pointer;
    transition: all 0.15s linear;
    border-bottom: 2px solid
        ${({ active }) => (active ? '#111' : 'transparent')};

    &:hover {
        background-color: #f9f9f9;
    }
`

export default function Auth({ isOpen, close }) {
    const [currentTab, setCurrentTab] = useState('login')

    return (
        <Dialog
            open={isOpen}
            onClose={() => close(false)}
            className='auth-modal'>
            <Dialog.Overlay className='overlay' />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='panel'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <TabItem
                                active={currentTab === 'login'}
                                onClick={() => setCurrentTab('login')}>
                                Login
                            </TabItem>
                            <TabItem
                                active={currentTab === 'signup'}
                                onClick={() => setCurrentTab('signup')}>
                                Sign Up
                            </TabItem>
                        </div>
                        <div className='panel-form'>
                            <AnimatePresence>
                                {currentTab === 'login' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}>
                                        <Login />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {currentTab === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}>
                                        <Signup />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Dialog>
    )
}
