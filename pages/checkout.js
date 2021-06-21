import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'

import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'

import { RadioGroup } from '@headlessui/react'

import calcTotalPrice from '../utils/calcTotalPrice'
import appContext from '../context/appContext'

import SingleOrder from '../Components/Product/SingleOrder'
import FormInput from '../Components/FormInput/FormInput'
import Footer from '../Components/Footer/Footer'
import Auth from '../Components/Auth/Auth'

import { useFormik } from 'formik'

export async function getServerSideProps({ req, res }) {
    const token = req.cookies.token || ''

    if (token !== '') {
        let response = await axios.get(
            `https://jaysneakers.herokuapp.com/api/auth/verify`,
            {
                headers: {
                    authorization: token,
                },
            }
        )

        if (response.data.status === 200) {
            return {
                props: {
                    user: response.data.data,
                },
            }
        }
    }

    return {
        props: {
            user: {},
        },
    }
}

export default function checkout({ user }) {
    const globalContext = useContext(appContext)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('credit')

    const formik = useFormik({
        initialValues: {
            email: '',
            fullname: user.fullname || '',
            city: '',
            state: '',
            address: '',
        },
        validate: (values) => {
            let errors = {}

            if (!values.email) {
                errors.email = 'Please enter your email'
            }

            if (!values.fullname) {
                errors.fullname = 'Please enter your email'
            } else if (!isAlpha(values.fullname, 'en-US', { ignore: ' ' })) {
                errors.fullname = 'Invalid Full Name'
            }

            if (!values.city) {
                errors.city = 'Please enter your email'
            } else if (!isAlpha(values.city, 'en-US', { ignore: ' ' })) {
                errors.city = 'Invalid city name'
            }

            if (!values.state) {
                errors.state = 'Please enter your email'
            } else if (!isAlpha(values.state, 'en-US', { ignore: ' ' })) {
                errors.state = 'Invalid state name'
            }

            if (!values.address) {
                errors.address = 'Please enter your email'
            } else if (
                !isAlphanumeric(values.address, 'en-US', { ignore: ' #-' })
            ) {
                errors.state = 'Invalid address'
            }

            return errors
        },
        onSubmit: (values) => {
            let orderItems = []

            globalContext.cart.forEach((item) => {
                orderItems.push({
                    productid: item.id,
                    price: item.price,
                    quantity: item.quantity,
                })
            })

            axios
                .post(
                    `https://jaysneakers.herokuapp.com/api/orders/placeOrder`,
                    {
                        uid: user.pid,
                        status: 'OnGoing',
                        address: `${values.state}, ${values.city}, ${values.address}`,
                        total: calcTotalPrice(globalContext.cart),
                        orderItems: orderItems,
                    }
                )
                .then((response) => {
                    if (response.data.status === 200) {
                        globalContext.clearCart()
                        Router.replace('/profile')
                    }
                })
                .catch((err) => console.log(err))
        },
        validateOnChange: false,
    })

    useEffect(() => {
        if (user && !user.hasOwnProperty('fullname')) {
            setIsAuthOpen(true)
        }
    }, [])

    return (
        <div>
            <Head>
                <title>Jays. | Checkout</title>
            </Head>
            <div className='container'>
                <h2 className='mt-5 mb-5'>Checkout</h2>
                <div className='row align-items-start min-vh-100 justify-content-between'>
                    <div className='col-12 col-lg-5'>
                        {globalContext.cart.length &&
                            globalContext.cart.map((order) => (
                                <SingleOrder order={order} key={order.id} />
                            ))}
                        <div className='d-flex align-items-center justify-content-between mt-4'>
                            <p>Total Items</p>
                            <h4 className='fw-bold'>
                                {globalContext.cart.length}
                            </h4>
                        </div>
                        <div className='d-flex align-items-center justify-content-between mt-3'>
                            <p>Total Price</p>
                            <h4 className='fw-bold'>
                                ${calcTotalPrice(globalContext.cart)}
                            </h4>
                        </div>
                    </div>
                    <div className='col-12 col-lg-5'>
                        <form
                            name='checkout-form'
                            onSubmit={formik.handleSubmit}>
                            <div className='mt-4'>
                                <label>Email</label>
                                <FormInput
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder='your email address'
                                    autoComplete='new password'
                                    error={formik.errors.email ? true : false}
                                />
                            </div>
                            <div className='mt-4'>
                                <label>Full Name</label>
                                <FormInput
                                    name='fullname'
                                    value={formik.values.fullname}
                                    onChange={formik.handleChange}
                                    placeholder='The person recieving this order'
                                    autoComplete='username'
                                    error={
                                        formik.errors.fullname ? true : false
                                    }
                                />
                            </div>
                            <div className='row'>
                                <div className='col-12 col-lg-6'>
                                    <div className='mt-4'>
                                        <label>State</label>
                                        <FormInput
                                            name='state'
                                            value={formik.values.state}
                                            onChange={formik.handleChange}
                                            placeholder='e.g New York'
                                            error={
                                                formik.errors.state
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                </div>
                                <div className='col-12 col-lg-6'>
                                    <div className='mt-4'>
                                        <label>City</label>
                                        <FormInput
                                            name='city'
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            placeholder='e.g New York'
                                            error={
                                                formik.errors.city
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <label>Address</label>
                                <FormInput
                                    name='address'
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    placeholder='e.g Main Street #21'
                                    error={formik.errors.address ? true : false}
                                />
                            </div>
                            <h4 className='py-4'>Payment Method</h4>
                            <div className='row'>
                                <RadioGroup
                                    value={paymentMethod}
                                    onChange={setPaymentMethod}
                                    as='div'
                                    className='checkout-payment-methods'>
                                    <RadioGroup.Label className='d-none'>
                                        Payment Method
                                    </RadioGroup.Label>
                                    <RadioGroup.Option
                                        key='credit'
                                        value='credit'
                                        as='div'
                                        className={({ checked }) =>
                                            `${
                                                checked ? 'active' : ''
                                            } checkout-payment-option`
                                        }>
                                        <span></span>
                                        <p>Credit Card</p>
                                    </RadioGroup.Option>
                                    <RadioGroup.Option
                                        key='paypal'
                                        value='paypal'
                                        as='div'
                                        className={({ checked }) =>
                                            `${
                                                checked ? 'active' : ''
                                            } checkout-payment-option`
                                        }>
                                        <span></span>
                                        <p>paypal</p>
                                    </RadioGroup.Option>
                                    <RadioGroup.Option
                                        key='visa'
                                        value='visa'
                                        as='div'
                                        className={({ checked }) =>
                                            `${
                                                checked ? 'active' : ''
                                            } checkout-payment-option`
                                        }>
                                        <span></span>
                                        <p>Visa Card</p>
                                    </RadioGroup.Option>
                                </RadioGroup>
                            </div>
                            <div className='d-flex align-items-center justify-content-end mt-5'>
                                <Link href='/' replace>
                                    <a className='btn me-3'>Cancel Order</a>
                                </Link>
                                <button
                                    className='btn btn-primary py-2'
                                    type='submit'>
                                    Complete Checkout
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {isAuthOpen && <Auth isOpen={isAuthOpen} />}
            <Footer />
        </div>
    )
}
