import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const TopbarStyle = styled.nav`
    background-color: white;
    position: sticky;
    top: 0;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 2px 5px 0px rgba(33, 33, 33, 0.15);
`

export default function Topbar() {
    return (
        <TopbarStyle>
            <div className='container'>
                <Link href='/'>
                    <a>Jays.</a>
                </Link>
            </div>
        </TopbarStyle>
    )
}
