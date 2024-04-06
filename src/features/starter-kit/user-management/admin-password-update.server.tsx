import { createBackendFunction, data, useFunctionContext, utils } from "@magicjs.dev/backend";
import moment from "moment";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function (_id, payload: any) {
    try {
        const userCollection = data("users");
        const context = useFunctionContext(this);
        const userId = context.currentUser._id
        const user = await userCollection.findOne({ _id: new ObjectId(_id) });

        const isSuperAdmin = await utils.isUserInAnyRoles(String(userId), "SUPER_ADMIN")
        if (!isSuperAdmin) {
            throw new Error(`Access Denied`);
        }

        if (user) {
            await userCollection.updateOne({ _id: new ObjectId(_id) }, {
                $set: {
                    password: utils.hash(payload.password),
                    passwordLastUpdatedAt: moment.utc().toDate()
                }
            });
        } else {
            throw new Error(`User not found`);
        }

        return { message: "Password added successfully" };
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})