import { createBackendFunction, data, loadConfig, useFunctionContext } from "@magicjs.dev/backend";
import config from './config.json';
import moment from 'moment';

export default createBackendFunction(async function (shippingAddress) {
    const context = useFunctionContext(this);
    const userId = context.currentUser._id

    if (!userId) {
        throw new Error(`Authentication failed`);
    }
    try {
        const cart: any = await data(config.cartCollectionName).findOne({ userId })
        let subTotal = cart.items.reduce((acc, item) => {
            return acc + item.totalAmount;
        }, 0);
        await data(config.orderCollectionName).insertOne({
            userId,
            shippingAddress,
            items: cart.items,
            subTotal,
            createdAt: moment.utc().valueOf(),
        });
        await data(config.cartCollectionName).updateOne(
            {
                userId,
            },
            { $set: { items: [] } }
        );
        return "Order placed"
    } catch (error) {
        throw new Error(`Network error`);
    }
})