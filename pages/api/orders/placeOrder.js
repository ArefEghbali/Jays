import prismaclient from '../../../utils/prismaclient'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { orderItems, uid, status, address, total } = req.body

        prismaclient.order
            .create({
                data: {
                    uid: uid,
                    total: total,
                    status: status,
                    address: address,
                },
            })
            .then((order) => {
                let finalOrderItems = [...orderItems]

                finalOrderItems.forEach((item) => {
                    item.orderid = order.id
                })

                prismaclient.orderDetails
                    .createMany({
                        data: finalOrderItems,
                    })
                    .then((orderItem) => {
                        res.json({
                            status: 200,
                            orderItem,
                        })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    } else {
        res.status(403).send('Only POST request is allowed')
    }
}
