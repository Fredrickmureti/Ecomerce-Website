import { createBackendFunction, data, utils } from "@magicjs.dev/backend";

export default createBackendFunction(async function (otp, hashedOtp, email) {
    const users = data('users');
    const validEmail = await users.findOne({ username: email });
    const isOtpVerified = utils.verifyHash(otp, hashedOtp);

    if (!validEmail) {
        throw new Error(`Email not found`);
    }

    if (!isOtpVerified) {
        throw new Error(`Otp is incorrect`);
    }

    return { otp, hashedOtp };
})