import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

import { ShoppingCart } from 'react-feather'

const ProductImage = styled.div`
    background-color: #f9f9f9;
    position: relative;
    overflow: hidden;
    display: grid;
    place-items: center;
    height: 300px;

    img {
        border-radius: 4px;
        object-fit: contain;
        width: 250px;
        height: auto;
    }
`

export default function SingleProduct({ product }) {
    return (
        <div className='w-100 mt-3'>
            <ProductImage>
                <Link
                    href={{ pathname: '/product', query: { pid: product.id } }}>
                    <a>
                        <Image
                            src={product.image.toString()}
                            alt={product.title}
                            width={250}
                            height={200}
                        />
                    </a>
                </Link>
            </ProductImage>
            <p className='mt-2'>{product.title}</p>
            <button className='btn btn-outline-dark mt-2 py-2 w-100'>
                <div className='d-flex align-items-center justify-content-between'>
                    <span>
                        <ShoppingCart size={24} className='me-2' />
                        Add To Cart
                    </span>
                    <b>${product.price}</b>
                </div>
            </button>
        </div>
    )
}
