import Dexie from 'dexie'

const db = new Dexie('jays')

db.version(1).stores({
    cart: '++id,pid',
})

export const getCartDB = async () => {
    const allCart = await db.table('cart').toArray()

    if (allCart.length) {
        return allCart
    }

    return []
}

export const addCartDB = (item) => {
    db.table('cart')
        .put(item)
        .then(() => {
            return
        })
        .catch((err) => console.log(err))
}

export const removeCartDB = (id) => {
    db.table('cart')
        .delete(id)
        .then(() => {
            return
        })
        .catch((err) => console.log(err))
}

export const updateCartQuantityDB = (id, quantity, action) => {
    if (action === 'add') {
        db.table('cart')
            .update(id, { quantity: (quantity += 1) })
            .then(() => {
                return
            })
            .catch((err) => console.log(err))
    } else if (action === 'subs') {
        db.table('cart')
            .update(id, { quantity: (quantity -= 1) })
            .then(() => {
                return
            })
            .catch((err) => console.log(err))
    }
}
