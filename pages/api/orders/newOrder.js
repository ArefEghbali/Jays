import prismaclient from '../../../utils/prismaclient'

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { uid, product, address, status, total } = req.body

        prismaclient.order
            .create({
                data: {
                    uid: uid,
                    product: product,
                    status: status,
                    address: address,
                    total: total,
                },
            })
            .then((order) => {
                res.json({
                    status: 200,
                    message: 'Order Submitted',
                    order: order,
                })
            })
            .catch((err) => console.log('error submitting order', err))
    } else {
        res.status(403).send('Only POST request is allowed')
    }
}
