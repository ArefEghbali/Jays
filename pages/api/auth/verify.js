import jwt from 'jsonwebtoken'

export default function handler(req, res) {
    if (req.method === 'GET') {
        jwt.verify(
            req.headers.authorization,
            'wizardking',
            {},
            (err, decoded) => {
                if (err) {
                    res.json({
                        status: 403,
                        message: 'Invalid token',
                    })
                    return
                }

                res.json({
                    status: 200,
                    data: decoded,
                })
            }
        )
    } else {
        res.status(403).send('Only GET method is allowed')
    }
}
