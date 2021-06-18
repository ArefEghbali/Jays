import prismaclient from '../../../utils/prismaclient'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fullname, email, password } = req.body

        if (fullname !== '' && email !== '' && password !== '') {
            let splittedName = fullname.split(' ')

            let checkEmail = await prismaclient.user.findUnique({
                where: {
                    email: email,
                },
            })

            if (checkEmail === null) {
                bcrypt.hash(password, 10).then((hashed) => {
                    prismaclient.user
                        .create({
                            data: {
                                firstName: splittedName[0],
                                lastName: splittedName[1],
                                email: email,
                                password: hashed,
                            },
                        })
                        .then((user) => {
                            let payload = {
                                pid: user.id,
                                fullname: fullname,
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
                                        message: 'new user has been created',
                                    })
                                }
                            )
                        })
                        .catch((err) => console.log(err)) // end of prisma create
                }) // end of bcrypt hash
            } else {
                res.json({
                    data: 403,
                    message: 'This email is already registered',
                })
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
