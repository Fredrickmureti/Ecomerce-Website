import { createBackendFunction, data, utils } from "@magicjs.dev/backend";
import moment from "moment";

export default createBackendFunction(async function (otp, hashedOtp, newPassword, email) {
    try {
        const users = data('users');
        const validEmail = await users.findOne({ username: email });
        const isOtpVerified = utils.verifyHash(otp, hashedOtp);

        if (!validEmail) {
            throw new Error(`Email not found`);
        }

        if (isOtpVerified) {
            await users.updateOne({ username: email }, {
                $set: {
                    password: utils.hash(newPassword),
                    passwordLastUpdatedAt: moment.utc().toDate()
                }
            });
        } else {
            throw new Error(`Something went wrong`);
        }

        return { message: "Password changed successfully" };
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})