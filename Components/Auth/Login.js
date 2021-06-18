import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { useFormik } from 'formik'
import Link from 'next/link'
import isEmail from 'validator/lib/isEmail'
import axios from 'axios'

export default function Login() {
    const [error, setError] = useState('')

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors = {}

            if (!values.email) {
                errors.email = 'Please enter email'
            } else if (!isEmail(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Please enter password'
            }

            return errors
        },
        onSubmit: (values) => {
            axios
                .post('http://localhost:3000/api/auth/login', {
                    email: values.email,
                    password: values.password,
                })
                .then((response) => {
                    if (response.data.status === 200) {
                        window.location.reload()
                    } else {
                        setError(response.data.message)
                    }
                })
                .catch((err) => console.log(err))
        },
        validateOnChange: false,
    })

    return (
        <form name='login-form' onSubmit={formik.handleSubmit}>
            <p className='text-danger text-center'>{error}</p>
            <div className='mt-4'>
                {formik.errors.email ? (
                    <label className='text-danger'>{formik.errors.email}</label>
                ) : (
                    <label>Email</label>
                )}
                <FormInput
                    name='email'
                    placeholder='e.g me@gamil.com'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoComplete='email'
                    type='text'
                    error={formik.errors.email ? true : false}
                />
            </div>
            <div className='mt-4'>
                {formik.errors.password ? (
                    <label className='text-danger'>
                        {formik.errors.password}
                    </label>
                ) : (
                    <label>Password</label>
                )}
                <FormInput
                    name='password'
                    placeholder='Your current password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    autoComplete='current password'
                    type='password'
                    error={formik.errors.password ? true : false}
                />
            </div>
            <div className='mt-4'>
                <Link href='/recoverpassword'>
                    <a>Recover Password</a>
                </Link>
            </div>
            <div className='mt-4'>
                <button className='btn btn-primary w-100' type='submit'>
                    Log Into Account
                </button>
            </div>
        </form>
    )
}
