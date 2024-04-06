import { createBackendFunction, data, utils } from '@magicjs.dev/backend';
import fs from 'fs';
import path from 'path';
import logoImage from '../assets/images/logo.png';

export default createBackendFunction(async function () {
    const projectSettingsCollection = data("project_settings");

    const projectSettings = await projectSettingsCollection.findOne({});
    if (!projectSettings || !projectSettings.imageId) {
        const reader = fs.createReadStream(path.join(__dirname, '../', logoImage), { autoClose: true });
        return {
            ___resMode: 'managed',
            reader: reader
        }
    } else {
        return utils.readFileFromUserUploads('/company-profile', projectSettings.imageId)
    }
})