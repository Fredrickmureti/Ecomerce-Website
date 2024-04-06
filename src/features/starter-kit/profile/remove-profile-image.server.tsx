import { createBackendFunction, utils, useFunctionContext, data } from '@magicjs.dev/backend';

export default createBackendFunction(async function (fileName: string) {
    const profileCollection = data("profiles");
    const context = useFunctionContext(this);
    const userId = context.currentUser._id;
    await profileCollection.updateOne(
        { userId },
        { $set: { profileImgId: null } }
    );
    return utils.removeFileFromUserUploads('/profile', fileName)
})