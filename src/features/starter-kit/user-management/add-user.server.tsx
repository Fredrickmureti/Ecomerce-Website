import { createBackendFunction, data, useFunctionContext, utils } from "@magicjs.dev/backend";
import moment from "moment";

export default createBackendFunction(async function (name, email) {
    try {
        const userCollection = data("users");
        const profileCollection = data("profiles")
        const context = useFunctionContext(this);
        const userId = context.currentUser._id
        const isSuperAdmin = await utils.isUserInAnyRoles(String(userId), "SUPER_ADMIN")

        if (!isSuperAdmin) {
            throw new Error(`Access Denied`);
        }

        const formattedEmail = email.toLowerCase();
        const existingUser = await userCollection.findOne({ username: formattedEmail });
        if (existingUser) {
            throw new Error(`User with same email already exists`);
        }

        const user = await userCollection.insertOne({
            name,
            username: formattedEmail,
            createdAt: moment.utc().toDate(),
        });

        await profileCollection.insertOne({
            name,
            email: formattedEmail,
            createdAt: moment.utc().toDate(),
            userId: String(user.insertedId)
        });

        return user.insertedId;
    } catch (error) {
        throw new Error(error?.message || "Network error");
    }
})