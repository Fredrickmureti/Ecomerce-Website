import { createBackendFunction, utils } from '@magicjs.dev/backend';

export default createBackendFunction(async function (fileName: string) {
    return utils.readFileFromUserUploads('/profile', fileName)
})