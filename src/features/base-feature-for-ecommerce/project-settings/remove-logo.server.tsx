import { createBackendFunction, data, useFunctionContext, utils } from "@magicjs.dev/backend";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function (fileName: string, id:string) {
    try {
        const projectSettingsCollection = data("project_settings");
        const context = useFunctionContext(this);
        const userId = context.currentUser._id;
        if (!userId) {
            throw new Error(`Authentication failed`);
        }
        await projectSettingsCollection.updateOne(
            {  _id: new ObjectId(id) },
            { $set: { imageId: null } }
        );
        return utils.removeFileFromUserUploads('/company-profile', fileName)
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})
