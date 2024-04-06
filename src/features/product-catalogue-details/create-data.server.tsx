import { createBackendFunction, data, loadConfig, useFunctionContext } from "@magicjs.dev/backend";
import configJson from './config.json';

const config = loadConfig(configJson);

export default createBackendFunction(async function (name, description) {
    try {
        const itemCollection = data(config.getValue('mongoDbCollectionName'));
        const isUserSpecificData = config.getValue('isUserSpecificData');
        const context = useFunctionContext(this);
        const userId = context.currentUser._id

        if (!userId) {
            throw new Error(`Authentication failed`);
        }

        let item
        if (isUserSpecificData) {
            item = await itemCollection.insertOne({ userId, name, description });
        } else {
            item = await itemCollection.insertOne({ name, description });
        }

        return item.insertedId;
    } catch (error) {
        throw new Error(`Network error`);
    }
})