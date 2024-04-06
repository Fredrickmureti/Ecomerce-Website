import { createBackendFunction, data, utils, useFunctionContext, ServerInstance } from "@magicjs.dev/backend";
import moment from 'moment';

ServerInstance.getInstance().auth.createCookieOptions = () => {
    return {
        expires: moment.utc().add(23, 'hours').toDate(),
        sameSite: 'none',
        secure: true
    }
}

export default createBackendFunction(async function (username, password) {
    const users = data('users');
    const formattedUsername = username.toLowerCase();
    const existingUser = await users.findOne({ username: formattedUsername });
    if (!existingUser) {
        throw new Error(`Username or Password is wrong`);
    }

    if (utils.verifyHash(password, existingUser.password) === false) {
        throw new Error(`Username or Password is wrong`);
    }

    const ctx = useFunctionContext(this);
    ctx.setCurrentUser(existingUser);

    const isSuperAdmin = await utils.isUserInAnyRoles(String(existingUser._id), "SUPER_ADMIN")
    return { isSuperAdmin };
})