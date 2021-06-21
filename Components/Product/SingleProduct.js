import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Popover } from '@headlessui/react'

import appContext from '../../context/appContext'

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
    const [selectedSize, setSelectedSize] = useState(product.sizes[0])

    const globalContext = useContext(appContext)

    const handleAddingItem = (item) => {
        let finalItem = {
            ...item,
            quantity: 1,
            size: selectedSize,
        }

        globalContext.addToCart(finalItem)
    }

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
                            loading='lazy'
                        />
                    </a>
                </Link>
            </ProductImage>
            <p className='mt-2'>{product.title}</p>
            <Popover className='position-relative'>
                <Popover.Button className='btn btn-outline-dark mt-2 py-3 w-100'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <span className='d-flex'>
                            <ShoppingCart size={24} className='me-2' />
                            <span className='d-none d-lg-flex'>
                                Add To Cart
                            </span>
                        </span>
                        <b>${product.price}</b>
                    </div>
                </Popover.Button>
                <Popover.Panel className='product-popover-panel'>
                    <h4>Select Size</h4>
                    <div className='d-flex align-items-center justify-content-start'>
                        {product.sizes.map((size) => (
                            <span
                                className={`${
                                    size === selectedSize
                                        ? 'btn btn-dark'
                                        : 'btn btn-outline-dark'
                                } me-2 mt-3 clickable`}
                                key={size}
                                onClick={() => setSelectedSize(size)}>
                                {size}
                            </span>
                        ))}
                    </div>
                    <button
                        className='btn btn-primary mt-4'
                        onClick={() => handleAddingItem(product)}>
                        Add To Cart
                    </button>
                </Popover.Panel>
            </Popover>
        </div>
    )
}
