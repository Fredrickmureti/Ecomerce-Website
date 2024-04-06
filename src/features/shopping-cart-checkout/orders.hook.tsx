import React from 'react';
import getOrders from "./orders.server"

export default function () {
    const [orders, setOrders] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        getOrders().then((res) => {
            setOrders(res)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [])

    return {
        orders,
        isLoading,
    }
}