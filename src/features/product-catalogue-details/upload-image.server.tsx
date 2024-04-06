import { createBackendFunction, data, loadConfig, createRequestContext, utils } from "@magicjs.dev/backend";
import { ObjectId } from 'mongodb';
import moment from 'moment';
import configJson from './config.json';

const config = loadConfig(configJson);

export default createBackendFunction(async function (id, payload: any) {
    try {
        const itemCollection = data(config.getValue('mongoDbCollectionName'));
        const fileName = moment().valueOf();
        createRequestContext(this)
            .uploader()
            .onFile((info, file) => {
                utils.saveFileToUserUploads('/products', `${fileName}.jpeg`, file);
            });
        const productImage = await itemCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ImgId: `${fileName}.jpeg` } }
        );
        return productImage;
    } catch (error) {
        throw new Error(`Network error`);
    }
})


