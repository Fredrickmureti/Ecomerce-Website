import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
import config from './config.json';

export default createBackendFunction(async function (itemId, itemName, ImgId) {
    const context = useFunctionContext(this);
    const userId = context.currentUser._id

    if (!userId) {
        throw new Error(`Authentication failed`);
    }
    const cartCollection = data(config.cartCollectionName);
    const existingCart = await cartCollection.findOne({ userId });

    const price = 0
    let cartItem = {
        itemId,
        quantity: 1,
        itemName,
        price,
        totalAmount: price,
        ImgId
    }

    try {
        if (!existingCart) {
            await cartCollection.insertOne({
                userId,
                items: [cartItem]
            });
        } else {
            const exsitingProduct = existingCart.items.find((item) => item.itemId === itemId)
            if (exsitingProduct) {
                const updatedQuantity = Number(exsitingProduct.quantity) + 1;
                const updatedTotalAmount = Number(exsitingProduct.quantity) * Number(exsitingProduct.price);
                await cartCollection.updateOne(
                    {
                        userId,
                        "items.itemId": exsitingProduct.itemId
                    },
                    { $set: { "items.$.quantity": updatedQuantity, "items.$.totalAmount": updatedTotalAmount, } }
                );
            } else {
                await cartCollection.updateOne({
                    userId
                },
                    { $push: { items: cartItem } }
                );
            }
        }
    } catch (error) {
        throw new Error(error?.message || "Network error");
    }

    return "Item added to cart";
})