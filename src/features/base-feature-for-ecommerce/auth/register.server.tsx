import { createBackendFunction, data, utils, useFunctionContext } from "@magicjs.dev/backend";
import moment from "moment";

export default createBackendFunction(async function (name, username, password, otp, hashedOtp) {
    const users = data('users');
    const profiles = data('profiles');

    const firstUser = await users.findOne({});
    if (firstUser) {
        const isOtpVerified = utils.verifyHash(otp, hashedOtp);

        if (!isOtpVerified) {
            throw new Error(`Otp is incorrect`);
        }
    }

    const formattedUsername = username.toLowerCase();
    const existingUser = await users.findOne({ username: formattedUsername });
    if (existingUser) {
        throw new Error(`User with same username already exists`);
    }
    const op = await users.insertOne({
        name,
        username: formattedUsername,
        password: utils.hash(password),
        createdAt: moment.utc().toDate(),
        passwordLastUpdatedAt: moment.utc().toDate()
    });
    let isSuperAdmin = false
    if (!firstUser) {
        await utils.assignRoleToUser(String(op.insertedId), "SUPER_ADMIN")
        isSuperAdmin = true
    }

    const user = await users.findOne({ _id: op.insertedId });

    const userId = user?._id.toString();
    await profiles.insertOne({
        name,
        email: formattedUsername,
        createdAt: moment.utc().toDate(),
        userId
    });

    const ctx = useFunctionContext(this);
    ctx.setCurrentUser(user);

    return { message: "Account registered", isSuperAdmin };
})