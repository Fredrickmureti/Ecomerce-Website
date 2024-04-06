import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
import config from './config.json';

export default createBackendFunction(async function () {
    const context = useFunctionContext(this);
    const userId = context.currentUser?._id

    if (!userId) {
        throw new Error(`Authentication failed`);
    }
    try {
        const orders = await data(config.orderCollectionName).find({ userId }).sort({ $natural: -1 }).toArray()

        return orders
    } catch (error) {
        throw new Error(`Network error`);
    }

})
