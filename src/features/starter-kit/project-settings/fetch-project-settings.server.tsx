import { createBackendFunction, data } from "@magicjs.dev/backend";

export default createBackendFunction(async function () {
    const projectSettingsCollection = data("project_settings"); 

    return await projectSettingsCollection.findOne({});
})