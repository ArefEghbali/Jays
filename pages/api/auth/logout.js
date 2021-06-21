import cookie from 'cookie'

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', '', {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV !== 'development',
                path: '/',
                expires: new Date(0),
            })
        )

        res.json({
            status: 200,
            message: 'Logged out',
        })
    } else {
        res.status(403).send('Only GET request is allowed')
    }
}
