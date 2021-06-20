export default function calcTotalPrice(items) {
    return items.reduce((sum, i) => {
        console.log(typeof i.quantity)
        return sum + parseFloat(i.price) * parseFloat(i.quantity)
    }, 0)
}
