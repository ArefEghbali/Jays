import React from 'react'
import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
export default function Modal({ isOpen, close, children }) {
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
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </Dialog>
    )
}
