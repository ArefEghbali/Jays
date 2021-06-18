import React from 'react'
import FormInput from '../FormInput/FormInput'
import { useFormik } from 'formik'
import Link from 'next/link'
import isEmail from 'validator/lib/isEmail'

export default function Login() {
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
            console.log(values)
        },
        validateOnChange: false,
    })

    return (
        <form name='login-form' onSubmit={formik.handleSubmit}>
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
