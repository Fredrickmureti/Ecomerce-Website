import React from 'react';
import { createSrc } from '@magicjs.dev/frontend';
import getCartDetails from "./cart.server"
import removeFromCart from './remove-from-cart.server';
import getProductImage from "./get-image.server";

export default function () {
    const [cart, setCart] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const imageSrc = createSrc(getProductImage);

    const refresh = React.useCallback(() => {
        getCartDetails().then((res) => {
            setCart(res)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [])

    const handleRemoveFromCart = React.useCallback((id) => {
        removeFromCart(id).then(() => {
            refresh();
        }).catch(() => { })
    }, [])

    React.useEffect(() => {
        refresh()
    }, [])

    return {
        cart,
        isLoading,
        handleRemoveFromCart,
        imageSrc
    }
}