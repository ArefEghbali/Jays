import prismaclient from '../../../utils/prismaclient'

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { orderid } = req.body

        prismaclient.order
            .update({
                where: {
                    id: orderid,
                },
                data: {
                    status: 'Cancelled',
                },
            })
            .then((updated) => {
                res.json({
                    status: 200,
                    message: 'Order cancelled',
                })
            })
            .catch((err) => console.log(err))
    } else {
        res.status(403).send('Only POST request is allowed')
    }
}
