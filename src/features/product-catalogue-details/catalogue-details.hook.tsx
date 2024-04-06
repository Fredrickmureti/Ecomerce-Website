import React from 'react';
import { createSrc } from '@magicjs.dev/frontend';
import fetchItemDetails from "./catalogue-details.server";
import { useParams } from '@magicjs.dev/frontend';
import getProductImage from "./get-image.server";

export default function () {
    const [item, setItem] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const { itemId } = useParams();
    const imageSrc = createSrc(getProductImage);

    React.useEffect(() => {
        fetchItemDetails(itemId).then((res) => {
            setItem(res)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [itemId])

    return {
        item,
        isLoading,
        imageSrc
    }
}