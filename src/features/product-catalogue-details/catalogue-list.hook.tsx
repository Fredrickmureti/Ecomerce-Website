import React from 'react';
import { createSrc } from '@magicjs.dev/frontend';
import listAllItems from "./catalogue-list.server";
import getProductImage from "./get-image.server";

export default function () {
    const [items, setItems] = React.useState<any>([])
    const [loading, setLoading] = React.useState<any>(true)
    const imageSrc = createSrc(getProductImage);

    React.useEffect(() => {
        listAllItems()
            .then((res) => {
                setItems(res)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    return {
        items,
        loading,
        imageSrc
    }
}