import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const OrderStyle = styled.div`
    display: grid;
    grid-template-columns: 100px 2fr 1fr 80px;
    align-items: center;
    justify-items: start;
    padding: 20px 0px;
    border-bottom: 1px solid rgba(33, 33, 33, 0.1);

    @media only screen and (max-width: 1024px) {
        grid-template-columns: 1fr 2fr;
    }
`

export default function SingleOrder({ order }) {
    return (
        <OrderStyle>
            <Image
                src={order.image}
                alt={order.title}
                width={92}
                height={92}
                objectFit='contain'
            />
            <div className='d-flex flex-column align-items-start justify-content-center ps-3'>
                <p>{order.title}</p>
                <b>${order.price}</b>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <p className='mb-2'>Quantity</p>
                <h4>{order.quantity}</h4>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <p className='mb-2'>Total Price</p>
                <h4>${order.quantity * order.price}</h4>
            </div>
        </OrderStyle>
    )
}
