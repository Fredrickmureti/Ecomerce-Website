import { createBackendFunction, data, useFunctionContext, utils } from "@magicjs.dev/backend";

export default createBackendFunction(async function () {
    try {
        const userCollection = data("users");
        const context = useFunctionContext(this);
        const userId = context.currentUser._id
        const isSuperAdmin = await utils.isUserInAnyRoles(String(userId), "SUPER_ADMIN")
        if (!isSuperAdmin) {
            throw new Error(`Access Denied`);
        }

        const projection = { name: 1, username: 1, passwordLastUpdatedAt:1 };
        const users = await userCollection.find({}, { projection }).toArray();
        for (const user of users) {
            let roles:any = await utils.findAllRolesByUser(String(user._id))
            roles = roles.map((role) => role.role)
            user.roles = roles
        }

        return users
    } catch (error) {
        throw new Error(error?.message || "Internal server error");
    }
})