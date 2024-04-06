import { createBackendFunction, data, utils } from "@magicjs.dev/backend";

export default createBackendFunction(async function (email) {
    const users = data('users');
    const user = await users.findOne({ username: email });
    /* otp generator */
    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    const otp: any = generateOTP();
    let hashedOtp

    try {
        if (!user) {
            try {
                const isEmailVerificationInitiated = await utils.initiateEmailVerification(email, otp)
                if (isEmailVerificationInitiated) {
                    hashedOtp = utils.hash(otp.toString());
                }
            } catch (error) {
                throw new Error(error);
            }

        } else {
            throw new Error(`User with same email exists`);
        }
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }

    return hashedOtp;
})