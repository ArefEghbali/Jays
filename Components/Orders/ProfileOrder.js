import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import calcTotalPrice from '../../utils/calcTotalPrice'

const ProfileOrderStyle = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
`

export default function ProfileOrder({ order }) {
    return (
        <ProfileOrderStyle>
            <div className='d-flex align-items-center justify-content-between'>
                <span>
                    <b className='me-2'>Order ID</b>
                    {order.id}
                </span>
                <span>
                    <b className='me-2'>Order Status</b>
                    <span
                        className={`${
                            order.status === 'cancelled'
                                ? 'text-danger'
                                : 'text-success'
                        }`}>
                        {order.status}
                    </span>
                </span>
            </div>
            <div className='d-flex align-items-center jusitfy-content-start'>
                {order.product.map((product) => (
                    <Link
                        href={{
                            pathname: '/product',
                            query: { pid: product.id },
                        }}
                        key={product.id}>
                        <a className='me-3 mt-3'>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={64}
                                height={52}
                                objectFit={'contain'}
                            />
                        </a>
                    </Link>
                ))}
            </div>
            <div className='d-flex align-items-center justify-content-between'>
                <span>
                    <b>Total Items</b>
                    {order.product.length}
                </span>
                <span>
                    <b>Total Price</b>
                    <span className={`text-center`}>
                        <h4 className='fw-bold'>${order.total}</h4>
                    </span>
                </span>
            </div>
            <div className='d-flex align-items-center justify-content-between mt-4'>
                <p>
                    <b>Shipping Address:</b>
                    {order.address}
                </p>
                {order.status === 'OnGoing' ? (
                    <button className='btn text-danger'>Cancel Order</button>
                ) : null}
            </div>
        </ProfileOrderStyle>
    )
}
