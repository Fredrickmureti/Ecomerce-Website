import { createBackendFunction, data, loadConfig, utils } from "@magicjs.dev/backend";
import configJson from './config.json';
import { ObjectId } from 'mongodb';

const config = loadConfig(configJson);

export default createBackendFunction(async function (fileName: string, id) {
    try {
        const itemCollection = data(config.getValue('mongoDbCollectionName'));
        await itemCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ImgId: null } }
        );
        return utils.removeFileFromUserUploads('/products', fileName)
    } catch (error) {
        throw new Error(`Network error`);
    }
})
