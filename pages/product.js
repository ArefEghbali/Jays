import React from 'react'
import Head from 'next/head'
import prismaclient from '../utils/prismaclient'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Plus, Minus, ShoppingCart, Heart } from 'react-feather'

import Topbar from '../Components/Topbar/Topbar'
import Footer from '../Components/Footer/Footer'

export async function getServerSideProps({ query }) {
    const { pid } = query

    let product = await prismaclient.product.findUnique({
        where: {
            id: pid,
        },
    })

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    }
}

export default function product({ product }) {
    return (
        <motion.div className='single-product-page' exit={{ opacity: 0 }}>
            <Head>
                <title>Jays. | {product.title}</title>
            </Head>
            <Topbar />
            <div className='product-container'>
                <div className='row'>
                    <div className='col-12 col-lg-6 product-image'>
                        <motion.div
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.65, duration: 0.4 }}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={600}
                                height={400}
                                objectFit='contain'
                            />
                        </motion.div>
                    </div>
                    <motion.div
                        className='col-12 col-lg-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.75 }}>
                        <Link href='/'>
                            <a className='text-dark d-block mb-5'>
                                Back To Home
                            </a>
                        </Link>
                        <span className='text-muted'>{product.category}</span>
                        <h2 className='mt-2 mb-2'>{product.title}</h2>
                        <h4 className='fw-bold mb-3'>${product.price}</h4>
                        <p>{product.description}</p>
                        <div className='d-flex align-items-center justify-content-between w-50 mt-5 mb-4'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <button className='btn'>
                                    <Minus size={24} />
                                </button>
                                <b className='px-4'>1</b>
                                <button className='btn btn-secondary'>
                                    <Plus size={24} />
                                </button>
                            </div>
                        </div>
                        <h3 className='fw-bold'>Sizes</h3>
                        <div className='d-flex align-items-center justify-content-start w-50 mb-4'>
                            {product.sizes.map((size) => (
                                <span
                                    key={size}
                                    className='btn btn-outline-dark me-3 mt-3 clickable'>
                                    {size}
                                </span>
                            ))}
                        </div>
                        <p className='text-muted'>Total Price</p>
                        <h3 className='fw-bold mb-4'>${product.price}</h3>
                        <button className='btn btn-lg btn-primary'>
                            <ShoppingCart size={24} className='me-3' />
                            Add To Cart
                        </button>
                        <button className='btn btn-lg btn-outline-secondary ms-3'>
                            <Heart size={24} className='me-3' />
                            Add To Wishlist
                        </button>
                        <h2 className='mt-5 fw-bold'>More From This Brand</h2>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </motion.div>
    )
}
