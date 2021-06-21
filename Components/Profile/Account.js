import React, { useState } from 'react'
import axios from 'axios'

import FormInput from '../FormInput/FormInput'
import { useFormik } from 'formik'

import isAlpha from 'validator/lib/isAlpha'
import isEmail from 'validator/lib/isEmail'

export default function Account({ user }) {
    const [error, setError] = useState('')

    const formik = useFormik({
        initialValues: {
            email: user.email || '',
            fullname: `${user.firstName} ${user.lastName}` || '',
        },
        validate: (values) => {
            const errors = {}

            if (!values.email) {
                errors.email = 'Please enter email'
            } else if (!isEmail(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.fullname) {
                errors.fullname = 'Please enter your fullname'
            } else if (!isAlpha(values.fullname, 'en-US', { ignore: ' ' })) {
                errors.fullname = 'Invalid full name'
            }

            return errors
        },
        onSubmit: (values) => {
            axios
                .post(`${process.env.BASE_API_URL}updateaccount`, {
                    email: values.email,
                    fullname: values.fullname,
                    uid: user.id,
                    newEmail: values.email !== user.email,
                })
                .then((response) => {
                    console.log(response.data)
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
        <div className='row justify-content-center mt-5'>
            <div className='col-12 col-lg-5'>
                <p className='text-center mb-3 text-danger'>{error}</p>
                <form name='account-form' onSubmit={formik.handleSubmit}>
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
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            placeholder='Your Full Name'
                            type='text'
                            error={formik.errors.fullname ? true : false}
                        />
                    </div>
                    <div className='mt-4'>
                        {formik.errors.email ? (
                            <label className='text-danger'>
                                {formik.errors.email}
                            </label>
                        ) : (
                            <label>Email</label>
                        )}
                        <FormInput
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder='Your Email Address'
                            type='text'
                            error={formik.errors.email ? true : false}
                        />
                    </div>
                    <div className='mt-4'>
                        <button className='btn btn-primary' type='submit'>
                            Update Account
                        </button>
                        <button
                            className='btn ms-3'
                            type='button'
                            onClick={() => formik.handleReset()}>
                            Cancel Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
