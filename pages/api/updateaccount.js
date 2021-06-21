import prismaclient from '../../utils/prismaclient'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, fullname, uid, newEmail } = req.body

        const splittedName = fullname.split(' ')

        let dupEmail = prismaclient.user.findUnique({
            where: {
                email: email,
            },
        })

        if (newEmail && dupEmail !== null) {
            res.json({
                status: 403,
                message: 'This email is already taken',
            })
            return
        }

        prismaclient.user
            .update({
                where: {
                    id: uid,
                },
                data: {
                    email: email,
                    firstName: splittedName[0],
                    lastName: splittedName[1],
                },
            })
            .then(() => {
                res.json({
                    status: 200,
                    message: 'Your acocunt info has been updated',
                })
            })
            .catch((err) => console.log(err))
    } else {
        res.status(403).send('Only POST request is allowed')
    }
}
