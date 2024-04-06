import { createBackendFunction, data } from "@magicjs.dev/backend";

export default createBackendFunction(async function () {
    const users = data('users');
    const existingUser = await users.findOne({});
    let hasSuperAdmin = true
    if (!existingUser) {
        hasSuperAdmin = false
    }

    return hasSuperAdmin;
})