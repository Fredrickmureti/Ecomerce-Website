import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";

export default createBackendFunction(async function (payload: any) {
    try {
        const profileCollection = data("profiles");
        const context = useFunctionContext(this);
        const userId = context.currentUser._id

        if (!userId) {
            throw new Error(`Authentication failed`);
        }

        delete payload._id;
        const profile = await profileCollection.updateOne(
            {
                userId
            },
            {
                $set: payload
            },
            {
                upsert: true
            }
        );

        return profile;
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})