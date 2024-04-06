import { createBackendFunction, data, useFunctionContext, utils } from "@magicjs.dev/backend";
import moment from "moment";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function (password, newPassword) {
    try {
        const users = data('users');
        const context = useFunctionContext(this);
        const userId = context.currentUser._id
        const user: any = await users.findOne({ _id: new ObjectId(userId) });
        const isPasswordVerified = utils.verifyHash(password, user.password);

        if (!userId) {
            throw new Error(`Authentication failed`);
        }

        if (isPasswordVerified) {
            await users.updateOne({ _id: new ObjectId(userId) }, {
                $set: {
                    password: utils.hash(newPassword),
                    passwordLastUpdatedAt: moment.utc().toDate()
                }
            });
        } else {
            throw new Error(`Incorrect password`);
        }

        return { message: "Password changed successfully" };
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})