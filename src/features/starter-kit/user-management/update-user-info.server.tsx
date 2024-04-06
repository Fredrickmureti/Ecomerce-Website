import { createBackendFunction, data, useFunctionContext, utils } from "@magicjs.dev/backend";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function (_id, payload: any) {
    try {
        const userCollection = data("users");
        const profileCollection = data("profiles");
        const context = useFunctionContext(this);
        const userId = context.currentUser._id
        const isSuperAdmin = await utils.isUserInAnyRoles(String(userId), "SUPER_ADMIN")
        if (!isSuperAdmin) {
            throw new Error(`Access Denied`);
        }

        const formattedUsername = payload.username.toLowerCase();
        const existingUser = await userCollection.findOne({ username: formattedUsername });
        if (existingUser && existingUser._id.toString() !== _id) {
            throw new Error(`User with same username already exists`);
        }

        delete payload._id;
        const user = await userCollection.updateOne(
            {
                _id: new ObjectId(_id)
            },
            {
                $set: payload
            },
            {
                upsert: true
            }
        );

        await profileCollection.updateOne(
            {
                userId: _id
            },
            {
                $set: {
                    name: payload.name,
                    email: payload.username
                }
            },
            {
                upsert: true
            }
        );

        return user;
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})