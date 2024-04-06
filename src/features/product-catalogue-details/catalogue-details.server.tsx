import { createBackendFunction, data, loadConfig } from "@magicjs.dev/backend";
import { ObjectId } from 'mongodb'
import configJson from './config.json';

const config = loadConfig(configJson);

export default createBackendFunction(async function (id) {
    try {
        const itemCollection = data(config.getValue('mongoDbCollectionName'));
        const itemsDetails = await itemCollection.findOne({
            _id: new ObjectId(id)
        });
        return itemsDetails;
    } catch (error) {
        throw new Error(`Network error`);
    }
})