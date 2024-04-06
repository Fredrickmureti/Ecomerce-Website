import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
import config from './config.json';

export default createBackendFunction(async function (itemId) {
    const context = useFunctionContext(this);
    const userId = context.currentUser?._id

    if (!userId) {
        throw new Error(`Authentication failed`);
    }
    try {
        const cart = await data(config.cartCollectionName).findOne({ userId })
        if (cart) {
            await data(config.cartCollectionName).updateOne(
                {
                    userId,
                },
                { $pull: { "items": { itemId } } }
            );
            return { messsgae: "Item removed from cart" }
        } else {
            return { messsgae: "No items to remove" }
        }
    } catch (error) {
        throw new Error(`Network error`);
    }

})
