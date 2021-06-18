import React from 'react'
import styled from 'styled-components'

const InputStyle = styled.input`
    background-color: #f9f9f9;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    border: 1.2px solid ${({ error }) => (error ? 'red' : 'transparent')};
    border-radius: 4px;
    width: 100%;

    &:focus {
        outline: none;
        box-shadow: none;
        border-color: #0d6efd;
        background-color: white;
    }
`

export default function FormInput({
    name,
    value,
    onChange,
    autoComplete,
    placeholder,
    type,
    error,
}) {
    return (
        <InputStyle
            error={error}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete || 'off'}
            placeholder={placeholder}></InputStyle>
    )
}
