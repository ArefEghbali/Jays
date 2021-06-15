import React from 'react'
import styled from 'styled-components'

const FilterStyle = styled.aside`
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0px 4px 10px 0px rgba(33, 33, 33, 0.15);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    width: 100%;
`

const FilterOption = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
`

const FilterSize = styled.span`
    cursor: pointer;
    border: 1px solid #111;
    border-radius: 4px;
    width: 36px;
    height: 36px;
    margin: 10px;
    color: #111;
    background-color: white;
    display: grid;
    place-items: center;
    transition: all 0.15s linear;

    &:hover {
        background-color: #111;
        color: white;
    }

    &.active {
        background-color: #111;
        color: white;
    }
`

export default function FilterBar() {
    const sizes = [
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
    ]

    return (
        <FilterStyle>
            <h4 className='fw-bold mb-3'>Collections</h4>
            <FilterOption>
                Men
                <input type='checkbox' />
            </FilterOption>
            <FilterOption>
                Women
                <input type='checkbox' />
            </FilterOption>
            <hr />
            <h4 className='fw-bold mb-3'>Sizes</h4>
            <div className='filter-sizes-container'>
                {sizes.map((size) => (
                    <FilterSize key={size}>{size}</FilterSize>
                ))}
            </div>
            <hr />
            <h4 className='fw-bold mb-3'>Brands</h4>
            <div className='filter-sizes-container'>
                <button className='btn btn-outline-dark me-3'>Adidas</button>
                <button className='btn btn-outline-dark me-3'>Puma</button>
                <button className='btn btn-outline-dark me-3'>Nike</button>
                <button className='btn btn-outline-dark me-3 mt-3'>
                    Converse
                </button>
            </div>
        </FilterStyle>
    )
}
