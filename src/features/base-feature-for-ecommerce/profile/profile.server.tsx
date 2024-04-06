import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function () {
    try {
        const profileCollection = data("profiles");
        const context = useFunctionContext(this);
        const userId = context.currentUser._id

        if (!userId) {
            throw new Error(`Authentication failed`);
        }

        const additionalInfo = await profileCollection.findOne({ userId });
        const users = data('users');
        const basicInfo = await users.findOne({ _id: new ObjectId(userId) });

        return { additionalInfo, basicInfo };
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})