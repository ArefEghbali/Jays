import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

const ProfileOrderStyle = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`

export default function ProfileOrder({ order }) {
    const handleCancelOrder = (orderid) => {
        axios
            .post(`https://jaysneakers.herokuapp.com/api/orders/cancelOrder`, {
                orderid,
            })
            .then((response) => {
                if (response.data.status === 200) {
                    window.location.reload()
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <ProfileOrderStyle>
            <div className='d-flex align-items-center justify-content-between flex-column-mobile'>
                <span>
                    <b className='me-2'>Order ID</b>
                    {order.id}
                </span>
                <span className='order-status'>
                    <b className='me-2'>Order Status</b>
                    <span
                        className={`${
                            order.status === 'Cancelled'
                                ? 'text-danger'
                                : 'text-success'
                        }`}>
                        {order.status}
                    </span>
                </span>
            </div>
            <div className='d-flex align-items-center jusitfy-content-start my-4'>
                {order.products.map((product) => (
                    <Link
                        href={{
                            pathname: '/product',
                            query: { pid: product.productid },
                        }}
                        key={product.id}>
                        <a className='me-3 mt-3'>
                            <Image
                                src={product.product.image}
                                alt={product.product.title}
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
                    {order.products.length}
                </span>
                <span>
                    <b>Total Price</b>
                    <span className={`text-center`}>
                        <h4 className='fw-bold'>${order.total}</h4>
                    </span>
                </span>
            </div>
            <div className='d-flex align-items-center justify-content-between mt-4 flex-column-mobile'>
                <p>
                    <b>Shipping Address:</b>
                    {order.address}
                </p>
                {order.status === 'OnGoing' ? (
                    <button
                        className='btn text-danger'
                        onClick={() => handleCancelOrder(order.id)}>
                        Cancel Order
                    </button>
                ) : null}
            </div>
        </ProfileOrderStyle>
    )
}
