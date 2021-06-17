import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import calcTotalPrice from '../../utils/calcTotalPrice'

import { ShoppingCart, Plus, Minus, Trash } from 'react-feather'

const CartItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0px;

    img {
        width: 64px;
        height: 64px;
        border-radius: 4px;
        object-fit: contain;
    }
`

import { Popover } from '@headlessui/react'

export default function Cart({ globalContext }) {
    const [cartItems, setCartItems] = useState(globalContext.cart)

    useEffect(() => {
        setCartItems(globalContext.cart)
    }, [globalContext.cart])

    return (
        <Popover className='position-relative'>
            <Popover.Button className='btn ms-4 d-flex align-items-center'>
                {globalContext.cart.length ? (
                    <span className='bg-dark text-white me-2 px-2 rounded'>
                        {globalContext.cart.length}
                    </span>
                ) : null}
                <ShoppingCart size={24} />
            </Popover.Button>
            <Popover.Panel className='cart-popover' as='div'>
                {cartItems.length ? (
                    <>
                        {cartItems.map((item, index) => (
                            <CartItem key={item.id}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    width='64px'
                                    height='64px'
                                />
                                <div className='d-flex align-items-start justify-content-center flex-column'>
                                    <p>{item.title}</p>
                                    <b>${item.price}</b>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <button
                                        className='btn'
                                        onClick={() =>
                                            globalContext.updateQuantity(
                                                item.id,
                                                'subs'
                                            )
                                        }>
                                        <Minus size={24} />
                                    </button>
                                    <h5 className='px-3'>{item.quantity}</h5>
                                    <button
                                        className='btn'
                                        onClick={() =>
                                            globalContext.updateQuantity(
                                                item.id,
                                                'add'
                                            )
                                        }>
                                        <Plus size={24} />
                                    </button>
                                </div>
                                <button
                                    className='btn btn-danger'
                                    onClick={() =>
                                        globalContext.removeItem(item.id)
                                    }>
                                    <Trash size={24} />
                                </button>
                            </CartItem>
                        ))}
                        <div className='d-flex align-items-center justify-content-between mt-3'>
                            <span>Total Price</span>
                            <h4 className='fw-bold'>
                                ${calcTotalPrice(cartItems)}
                            </h4>
                        </div>
                        <button className='btn btn-primary mt-4 py-2'>
                            Checkout
                        </button>
                    </>
                ) : (
                    <h4>Cart Is Empty</h4>
                )}
            </Popover.Panel>
        </Popover>
    )
}
