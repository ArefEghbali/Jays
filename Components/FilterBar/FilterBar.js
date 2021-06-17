import React, { useState } from 'react'
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
    height: max-content;
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

export default function FilterBar({
    brands,
    filterBrand,
    filterCollection,
    filterSize,
}) {
    const [brandFiltered, setBrandFiltered] = useState({
        nike: false,
        puma: false,
        adidas: false,
        converse: false,
    })

    const sizes = [
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
    ]

    const handleBrandSelection = (brand, title) => {
        let lowBrand = title.toLowerCase()
        setBrandFiltered((prev) => ({
            ...prev,
            [lowBrand]: true,
        }))
        filterBrand(brand)
    }

    return (
        <FilterStyle>
            <h4 className='fw-bold mb-3'>Collections</h4>
            <FilterOption onClick={() => filterCollection('Men')}>
                Men
                <input type='checkbox' />
            </FilterOption>
            <FilterOption onClick={() => filterCollection('Women')}>
                Women
                <input type='checkbox' />
            </FilterOption>
            <hr />
            <h4 className='fw-bold mb-3'>Sizes</h4>
            <div className='filter-sizes-container'>
                {sizes.map((size) => (
                    <FilterSize key={size} onClick={() => filterSize(size)}>
                        {size}
                    </FilterSize>
                ))}
            </div>
            <hr />
            <h4 className='fw-bold'>Brands</h4>
            <div className='filter-sizes-container'>
                {brands.length
                    ? brands.map((brand) => (
                          <button
                              className={
                                  brandFiltered[brand.title.toLowerCase()] ===
                                  true
                                      ? `btn btn-dark me-3 mt-3`
                                      : 'btn btn-outline-dark me-3 mt-3'
                              }
                              key={brand.id}
                              onClick={() =>
                                  handleBrandSelection(brand.id, brand.title)
                              }>
                              {brand.title}
                          </button>
                      ))
                    : null}
            </div>
        </FilterStyle>
    )
}
