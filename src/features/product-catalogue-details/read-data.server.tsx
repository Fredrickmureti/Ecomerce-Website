import { createBackendFunction, data, loadConfig } from "@magicjs.dev/backend";
import { ObjectId } from 'mongodb';
import configJson from './config.json';

const config = loadConfig(configJson);

export default createBackendFunction(async function (_id) {
    try {
        const itemCollection = data(config.getValue('mongoDbCollectionName'));
        const item = await itemCollection.findOne({ _id: new ObjectId(_id) });

        return item;
    } catch (error) {
        throw new Error(`Network error`);

    }
})