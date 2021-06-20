import React from 'react'
import { Disclosure } from '@headlessui/react'
import Link from 'next/link'

import ProfileOrder from './ProfileOrder'

import { ChevronDown } from 'react-feather'

export default function OnGoingOrder({ orders, title, defaultOpen }) {
    return (
        <Disclosure defaultOpen={defaultOpen ? true : false}>
            <Disclosure.Button className='btn profile-order-toggle'>
                <div className='d-flex align-items-center'>
                    <h5>{title} Orders</h5>
                    <span className='px-2 ms-3 rounded bg-dark text-white'>
                        {orders.length}
                    </span>
                </div>
                <ChevronDown size={24} />
            </Disclosure.Button>
            <Disclosure.Panel className='text-gray-500'>
                {orders.length ? (
                    orders.map((order) => <ProfileOrder order={order} />)
                ) : (
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                        <h4 className='text-muted'>
                            You don't have any on {title.toLowerCase()} orders
                        </h4>
                        {title === 'OnGoing' || title === 'Completed' ? (
                            <Link href='/'>
                                <a className='btn btn-primary mt-4 py-2'>
                                    Make Your First Order
                                </a>
                            </Link>
                        ) : null}
                    </div>
                )}
            </Disclosure.Panel>
        </Disclosure>
    )
}
