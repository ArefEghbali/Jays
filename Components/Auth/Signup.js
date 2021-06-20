import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { useFormik } from 'formik'
import axios from 'axios'

import isAlpha from 'validator/lib/isAlpha'
import isEmail from 'validator/lib/isEmail'

export default function Signup() {
    const [error, setError] = useState('')

    console.log(process.env.BASE_API_URL)

    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors = {}

            if (!values.fullname) {
                errors.fullname = 'Please enter email'
            } else if (!isAlpha(values.fullname, 'en-US', { ignore: ' ' })) {
                errors.fullname = 'Only use english letters'
            }

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
                .post(`${process.env.BASE_API_URL}auth/signup`, {
                    fullname: values.fullname,
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
        <form name='signup-form' onSubmit={formik.handleSubmit}>
            <p className='text-danger text-center'>{error}</p>
            <div className='mt-4'>
                {formik.errors.fullname ? (
                    <label className='text-danger'>
                        {formik.errors.fullname}
                    </label>
                ) : (
                    <label>Full Name</label>
                )}
                <FormInput
                    name='fullname'
                    placeholder='e.g John Doe'
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    autoComplete='username'
                    type='text'
                    error={formik.errors.fullname ? true : false}
                />
            </div>
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
                <button className='btn btn-primary w-100' type='submit'>
                    Create Account
                </button>
            </div>
        </form>
    )
}
