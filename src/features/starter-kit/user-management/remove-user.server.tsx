import { createBackendFunction, data } from "@magicjs.dev/backend";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function (_id) {
    try {
        const userCollection = data("users");
        const item = await userCollection.deleteOne({ _id: new ObjectId(_id) });

        return item.acknowledged;
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})