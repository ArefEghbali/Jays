import React, { useState } from 'react'
import Head from 'next/head'

import prismaclient from '../utils/prismaclient'

import FormInput from '../Components/FormInput/FormInput'
import BottomNavigation from '../Components/BottomNavigation/BottomNavigation'
import Footer from '../Components/Footer/Footer'
import SingleProduct from '../Components/Product/SingleProduct'

export async function getServerSideProps({ req, res }) {
    if (typeof window === 'undefined') {
        let products = await prismaclient.product.findMany()

        return {
            props: {
                products: JSON.parse(JSON.stringify(products)),
            },
        }
    }
}

export default function search({ products }) {
    const [allProducts, setAllProducts] = useState(products)

    const returnSearchResult = (keyword) => {
        setAllProducts((prev) => {
            if (keyword.length && keyword !== '') {
                let newList = prev.filter((prevItem) =>
                    prevItem.title.toLowerCase().includes(keyword.toLowerCase())
                )

                return newList
            } else {
                return products
            }
        })
    }

    return (
        <div>
            <Head>
                <title>Jays. | Search</title>
            </Head>
            <div className='container pt-4 min-vh-100'>
                <FormInput
                    name='search'
                    placeholder='Search Products...'
                    onChange={(e) => returnSearchResult(e.currentTarget.value)}
                />
                <div className='products-grid mt-5'>
                    {allProducts.length &&
                        allProducts.map((product) => (
                            <SingleProduct product={product} key={product.id} />
                        ))}
                </div>
            </div>
            <BottomNavigation active='search' />
            <Footer />
        </div>
    )
}
