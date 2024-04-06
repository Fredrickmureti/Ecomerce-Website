import { createBackendFunction, data, loadConfig, useFunctionContext } from "@magicjs.dev/backend";
import configJson from './config.json';

const config = loadConfig(configJson);

export default createBackendFunction(async function () {
    try {
        const itemCollection = data(config.getValue('mongoDbCollectionName'));
        const isUserSpecificData = config.getValue('isUserSpecificData');
        const context = useFunctionContext(this);
        const userId = context.currentUser._id

        if (!userId) {
            throw new Error(`Authentication failed`);
        }

        if (isUserSpecificData) {
            return await itemCollection.find({ userId }).toArray();
        } else {
            return await itemCollection.find().toArray();
        }

    } catch (error) {
        throw new Error(`Network error`);
    }
})