export default function calcTotalPrice(items) {
    return items.reduce((sum, i) => {
        return sum + i.price * i.quantity
    }, 0)
}
