import { useParams } from '@magicjs.dev/frontend';
import React from 'react';
import addToCart from "./add-to-cart.server"

export default function (props) {
    const [showAlert, setShowAlert] = React.useState(false);
    const [err, setErr] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { itemId } = useParams();
    const { itemName, ImgId } = props;
    
    const handleAddToCart = React.useCallback(() => {
        setLoading(true)
        setErr("")
        addToCart(itemId, itemName, ImgId).then(() => {
            setLoading(false);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }).catch((e) => {
            setLoading(false)
            setErr(e.message || "Failed to Add to Cart")
        });
    }, [itemId, itemName, ImgId]);

    return {
        loading,
        handleAddToCart,
        showAlert,
        err
    }
}