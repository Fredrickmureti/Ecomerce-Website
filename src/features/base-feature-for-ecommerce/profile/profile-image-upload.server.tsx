import { createBackendFunction, createRequestContext, utils, useFunctionContext, data } from '@magicjs.dev/backend';
import moment from 'moment';

export default createBackendFunction(async function () {
    const profileCollection = data("profiles");
    const context = useFunctionContext(this);
    const userId = context.currentUser._id;
    const fileName = moment().valueOf();

    createRequestContext(this)
        .uploader()
        .onFile((info, file) => {
            utils.saveFileToUserUploads('/profile', `${fileName}.jpeg`, file);
        });
    const profile = await profileCollection.updateOne(
        { userId },
        { $set: { profileImgId: `${fileName}.jpeg` } }
    );
    return profile;
})


