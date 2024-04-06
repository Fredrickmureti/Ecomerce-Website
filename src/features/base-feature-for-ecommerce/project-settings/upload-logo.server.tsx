import { createBackendFunction, data, createRequestContext, utils, useFunctionContext } from "@magicjs.dev/backend";
import moment from "moment";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function () {
    try {
        const projectSetiingsCollection = data("project_settings");
        const context = useFunctionContext(this);
        const userId = context.currentUser._id;
        const isSuperAdmin = await utils.isUserInAnyRoles(String(userId), "SUPER_ADMIN")
        if (!isSuperAdmin) {
            throw new Error(`Access Denied`);
        }
        const fileName = moment().valueOf();

        const existingDocument = await projectSetiingsCollection.findOne({});
        createRequestContext(this)
            .uploader()
            .onFile(async (info, file) => {
                utils.saveFileToUserUploads('/company-profile', `${fileName}.jpeg`, file);
            });


        if (existingDocument) {
            await projectSetiingsCollection.updateOne(
                { _id: new ObjectId(existingDocument._id) },
                { $set: { imageId: `${fileName}.jpeg`,  } }
            );
        } else {
            await projectSetiingsCollection.insertOne({
                imageId: `${fileName}.jpeg`,
            });
        }


        return { message: "Insert/Update successful" };
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
});











