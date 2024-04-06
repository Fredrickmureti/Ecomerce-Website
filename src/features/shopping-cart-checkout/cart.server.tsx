import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
import config from './config.json';

export default createBackendFunction(async function () {
    const context = useFunctionContext(this);
    const userId = context.currentUser?._id

    if (!userId) {
        throw new Error(`Authentication failed`);
    }
    try {
        const cart = await data(config.cartCollectionName).findOne({ userId })
        if (cart) {
            let subTotal = cart.items.reduce((acc, item) => {
                return acc + item.totalAmount;
            }, 0);
            return { items: cart.items, subTotal };
        } else {
            return { items: [], subTotal: 0 }
        }

    } catch (error) {
        throw new Error(`Network error`);
    }
})
