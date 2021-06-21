export default function calcTotalPrice(items) {
    return items.reduce((sum, i) => {
        return sum + parseFloat(i.price) * parseFloat(i.quantity)
    }, 0)
}
