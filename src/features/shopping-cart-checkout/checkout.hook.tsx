import React from 'react';
import getCartDetails from "./cart.server"
import checkout from './checkout.server';

export default function () {
    const [email, setEmail] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [err, setErr] = React.useState("");
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")
    const [postalCode, setPostalCode] = React.useState("")
    const [cart, setCart] = React.useState(null)
    const [cartLoading, setCartLoading] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false)

    const loadCart = React.useCallback(() => {
        getCartDetails().then((res) => {
            setCart(res)
            setCartLoading(false)
        }).catch(() => {
            setCartLoading(false)
        })
    }, [])

    const handlePlaceOrder = React.useCallback(() => {
        setLoading(true)
        setErr("")
        checkout({ email, address, city, state, postalCode }).then((res) => {
            setLoading(false)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 1500);
            window.location.replace('/orders')
            loadCart()
        }).catch((e) => {
            setLoading(false)
            setErr(e.message || "Failed to Place Order")
        })
    }, [email, address, city, state, postalCode])

    React.useEffect(() => {
        loadCart()
    }, [])

    const disabledState = React.useMemo(() => {
        if (!email || !address || !city || !state || !postalCode) {
            return true
        } else {
            return false
        }
    }, [email, address, city, state, postalCode])

    return {
        email, setEmail,
        address, setAddress,
        city, setCity,
        state, setState,
        postalCode, setPostalCode,
        handlePlaceOrder,
        loading,
        cartLoading,
        cart,
        showAlert,
        err,
        disabledState
    }
}