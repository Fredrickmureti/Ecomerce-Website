import { createBackendFunction, data, useFunctionContext, utils } from "@magicjs.dev/backend";
import { ObjectId } from "mongodb";

export default createBackendFunction(async function (id, role) {
    const context = useFunctionContext(this);
    const userCollection = data('users');
    const userId = context.currentUser._id
    const isSuperAdmin = await utils.isUserInAnyRoles(String(userId), "SUPER_ADMIN")
    if (!isSuperAdmin) {
        throw new Error(`Access Denied`);
    }
    
    await utils.unassignRoleFromUser(id, role)
    const projection = { name: 1, username: 1, passwordLastUpdatedAt: 1 };
    const user: any = await userCollection.findOne({ _id: new ObjectId(id) }, { projection })
    let roles: any = await utils.findAllRolesByUser(String(user._id))
    roles = roles.map((role) => role.role)
    user.roles = roles

    return user
})