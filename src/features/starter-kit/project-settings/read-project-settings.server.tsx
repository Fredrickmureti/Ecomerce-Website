import { createBackendFunction, data } from "@magicjs.dev/backend";

export default createBackendFunction(async function () {
    try {
        const projectSettingsCollection = data("project_settings");

        const projectSettings = await projectSettingsCollection.findOne({});

        if (!projectSettings) {
            return null;
        }

        return projectSettings;
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
});
