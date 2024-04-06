import { createSrc, useParams } from '@magicjs.dev/frontend';
import React from 'react';
import searchResult from "./search-results.server"
import getProductImage from "./get-image.server";

export default function () {
    const [items, setItems] = React.useState<any>([])
    const [loading, setLoading] = React.useState<any>(true)
    const { keyword } = useParams();
    const imageSrc = createSrc(getProductImage);

    React.useEffect(() => {
        const decodedKeyword = decodeURIComponent(keyword);
        searchResult(decodedKeyword).then((res) => {
            setItems(res)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [keyword])

    return {
        keyword,
        items,
        loading,
        imageSrc
    }
}