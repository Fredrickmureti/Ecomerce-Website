import { createBackendFunction, data, loadConfig } from "@magicjs.dev/backend";
import configJson from './config.json';

const config = loadConfig(configJson);

export default createBackendFunction(async function (keyword) {
    try {
        const itemCollection = data(config.getValue('mongoDbCollectionName'));
        const items = await itemCollection.find({
            "name": {
                $regex: keyword,
                $options: "i"
            }
        }).sort({ $natural: -1 }).toArray();

        return items;
    } catch (error) {
        throw new Error(`Network error`);
    }
})