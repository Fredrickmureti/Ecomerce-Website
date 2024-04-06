import { createBackendFunction, data } from "@magicjs.dev/backend";
import { ObjectId } from 'mongodb'
import config from './config.json';

export default createBackendFunction(async function (id) {
    try {
        const order = await data(config.orderCollectionName).findOne({
            _id: new ObjectId(id)
        });
        return order;
    } catch (error) {
        throw new Error(`Network error`);
    }
})