import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function (payload: any) {
    try {
        const profileCollection = data("profiles");
        const userCollection = data("users");
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
                $set: { name: payload.name }
            },
            {
                upsert: true
            }
        );
        const user = await userCollection.updateOne(
            {
                _id: new ObjectId(userId)
            },
            {
                $set: payload
            },
            {
                upsert: true
            }
        );

        return { profile, user };
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})