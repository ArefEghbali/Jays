import prismaclient from '../../../utils/prismaclient'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body

        if (email !== '' && password !== '') {
            let user = await prismaclient.user.findUnique({
                where: {
                    email: email,
                },
            })

            if (user === null || !user) {
                res.json({
                    status: 403,
                    message: 'Invalid email or password',
                })
            } else {
                bcrypt
                    .compare(password, user.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            let payload = {
                                pid: user.id,
                                fullname: `${user.firstName} ${user.lastName}`,
                            }
                            jwt.sign(
                                payload,
                                'wizardking',
                                { expiresIn: '1h' },
                                (err, token) => {
                                    if (err) {
                                        res.status(500).send('Error in jwt')
                                        return
                                    }

                                    res.setHeader(
                                        'Set-Cookie',
                                        cookie.serialize('token', token, {
                                            sameSite: 'strict',
                                            httpOnly: true,
                                            path: '/',
                                            secure:
                                                process.env.NODE_ENV !==
                                                'development',
                                            maxAge: 60 * 60,
                                        })
                                    )

                                    res.json({
                                        status: 200,
                                        message: 'user logged in',
                                    })
                                }
                            )
                        } else {
                            res.json({
                                status: 403,
                                message: 'Invalid email or password',
                            })
                        }
                    })
                    .catch((err) => console.log(err))
            }
        } else {
            res.json({
                status: 403,
                message: 'Invalid fields',
            })
        } // end of checking for empty fields
    } else {
        res.status(403).send('Only POST method is allowed')
    }
}
