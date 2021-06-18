import { useState, createContext, useEffect } from 'react'

import {
    addCartDB,
    updateCartQuantityDB,
    getCartDB,
    removeCartDB,
} from '../utils/indexeddb'

const appContext = createContext({})

export const Provider = ({ children }) => {
    const handleAddToCart = (item) => {
        setContextData((prev) => {
            let dupItem = prev.cart.findIndex(
                (prevItem) => prevItem.id === item.id
            )

            if (dupItem > -1) {
                let updatedItem = prev.cart
                updatedItem[dupItem].quantity += 1

                updateCartQuantityDB(item.id, updatedItem[dupItem].quantity)

                return {
                    ...prev,
                    cart: [...updatedItem],
                }
            } else {
                addCartDB(item)
            }

            return {
                ...prev,
                cart: [...prev.cart, item],
            }
        })
    }

    const updateQuantity = (id, action) => {
        setContextData((prev) => {
            let currentItem = prev.cart.findIndex(
                (prevItem) => prevItem.id === id
            )
            let currentCart = [...prev.cart]

            if (currentItem > -1) {
                if (action === 'add') {
                    updateCartQuantityDB(
                        currentCart[currentItem].id,
                        currentCart[currentItem].quantity + 1
                    )
                    currentCart[currentItem].quantity += 1
                } else if (action === 'subs') {
                    if (currentCart[currentItem].quantity - 1 > 0) {
                        updateCartQuantityDB(
                            currentCart[currentItem].id,
                            currentCart[currentItem].quantity - 1
                        )
                        currentCart[currentItem].quantity -= 1
                    }
                }
            }

            return {
                ...prev,
                cart: [...currentCart],
            }
        })
    }

    const removeItem = (id) => {
        setContextData((prev) => {
            let newCart = prev.cart.filter((prevItem) => prevItem.id !== id)
            removeCartDB(id)

            return {
                ...prev,
                cart: newCart,
            }
        })
    }

    const [contextData, setContextData] = useState({
        cart: [],
        addToCart: handleAddToCart,
        updateQuantity,
        removeItem,
    })

    useEffect(() => {
        getCartDB().then((cart) => {
            setContextData((prev) => ({
                ...prev,
                cart: cart,
            }))
        })
    }, [])

    return (
        <appContext.Provider value={contextData}>
            {children}
        </appContext.Provider>
    )
}

export default appContext
