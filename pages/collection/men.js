import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import prismaclient from '../../utils/prismaclient'

import Topbar from '../../Components/Topbar/Topbar'
import Footer from '../../Components/Footer/Footer'
import SingleProduct from '../../Components/Product/SingleProduct'

export async function getServerSideProps({ req, res }) {
    const products = await prismaclient.product.findMany({
        where: {
            category: 'Men',
        },
    })

    let token = req.cookies.token || ''

    if (token !== '') {
        let response = await axios.get(
            'http://localhost:3000/api/auth/verify',
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
                    products: JSON.parse(JSON.stringify(products)),
                },
            }
        }
    }

    return {
        props: {
            user: {},
            products: JSON.parse(JSON.stringify(products)),
        },
    }
}

export default function women({ user, products }) {
    return (
        <div>
            <Head>
                <title>Jays. | Men Collection</title>
            </Head>
            <Topbar user={user} />
            <div className='container'>
                <div className='row products-section'>
                    <div className='col-12'>
                        <h2 className='fw-bold mb-3'>Men Collection</h2>
                        <div className='products-grid'>
                            {products.length
                                ? products.map((product) => (
                                      <SingleProduct
                                          product={product}
                                          key={product.id}
                                      />
                                  ))
                                : null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
