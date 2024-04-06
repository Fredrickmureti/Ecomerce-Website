import { createBackendFunction, data, useFunctionContext, utils } from "@magicjs.dev/backend";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function (payload) {
    try {
        const projectSettingsCollection = data("project_settings");
        const context = useFunctionContext(this);
        const userId = context.currentUser._id;
        const isSuperAdmin = await utils.isUserInAnyRoles(String(userId), "SUPER_ADMIN")
        if (!isSuperAdmin) {
            throw new Error(`Access Denied`);
        }
        const existingDocument = await projectSettingsCollection.findOne({});
        if (existingDocument) {
            const { _id, ...updatedFields } = payload;
            await projectSettingsCollection.updateOne({ _id: new ObjectId(existingDocument._id) }, {
                $set: { ...updatedFields }
            });
        } else {
            await projectSettingsCollection.insertOne({
                ...payload
            });
        }
        return { ack: true }
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
});


