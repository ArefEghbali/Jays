import React from 'react'
import styled from 'styled-components'

const FooterStyle = styled.footer`
    padding: 40px 0px;
    background-color: #111;
    color: white;
    margin-top: 150px;
`

export default function Footer() {
    return (
        <FooterStyle>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-lg-4'>
                        <h2 className='fw-bold'>Jays.</h2>
                        <h4 className='mt-3'>Best Sneakers from Best Brands</h4>
                    </div>
                    <div className='col-12 col-lg-4'></div>
                    <div className='col-12 col-lg-4'></div>
                </div>
            </div>
        </FooterStyle>
    )
}
