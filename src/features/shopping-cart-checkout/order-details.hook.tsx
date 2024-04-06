import React from 'react';
import orderDetails from "./order-details.server"
import { useParams, createSrc } from '@magicjs.dev/frontend';
import getProductImage from "./get-image.server";

export default function () {
    const [order, setOrder] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const { orderId } = useParams();
    const imageSrc = createSrc(getProductImage);


    React.useEffect(() => {
        orderDetails(orderId).then((res) => {
            setOrder(res)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [orderId])

    return {
        order,
        loading,
        imageSrc
    }
}