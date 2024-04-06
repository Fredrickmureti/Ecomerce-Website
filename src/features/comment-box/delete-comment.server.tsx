import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
const { ObjectId } = require('mongodb');
import config from './config.json';

export default createBackendFunction(async function (commentId, userName) {
    const context = useFunctionContext(this);
    const isAuthenticated = context.isAuthenticated
    const currentUser = context.currentUser.username;

    if (!isAuthenticated) {
        throw new Error(`Authentication failed`);
    }

    if (isAuthenticated && currentUser === userName) {
        await data(config.collectionName).deleteOne({ _id: new ObjectId(commentId) });
    }

    return "Comment deleted"
})