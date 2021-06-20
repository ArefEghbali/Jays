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
                    <b>Order ID</b>
                    {order.id}
                </span>
                <span>
                    <b>Order Status</b>
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
            {order.products.map((product) => (
                <Link
                    href={{ pathname: '/product', query: { pid: product.id } }}>
                    <a>
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
            <div className='d-flex align-items-center justify-content-between'>
                <span>
                    <b>Total Items</b>
                    {order.products.length}
                </span>
                <span>
                    <b>Total Price</b>
                    <span
                        className={`${
                            order.status === 'cancelled'
                                ? 'text-danger'
                                : 'text-success'
                        }`}>
                        <h4 className='fw-bold'>
                            ${calcTotalPrice(order.products)}
                        </h4>
                    </span>
                </span>
            </div>
            {order.status === 'ongoing' ? (
                <button className='btn text-danger'>Cancel Order</button>
            ) : null}
        </ProfileOrderStyle>
    )
}
