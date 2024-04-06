import { createBackendFunction, data, utils } from "@magicjs.dev/backend";

export default createBackendFunction(async function (email) {
    const users = data('users');
    const validEmail = await users.findOne({ username: email });
    /* otp generator */
    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    const otp: any = generateOTP();
    let hashedOtp
    let isEmailVerified

    try {
        if (validEmail) {
            isEmailVerified = await utils.initiateEmailVerification(email, otp)
            hashedOtp = utils.hash(otp.toString());
        } else {
            throw new Error(`Email not found`);
        }
    } catch (error) {
        throw new Error(error?.message || "Network error");
    }

    return hashedOtp;
})