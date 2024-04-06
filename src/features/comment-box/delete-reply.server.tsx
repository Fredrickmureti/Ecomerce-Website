import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
const { ObjectId } = require('mongodb');
import config from './config.json';

export default createBackendFunction(async function (userName, commentId, replyId) {
    const context = useFunctionContext(this);
    const currentUser = context.currentUser.username;
    const isAuthenticated = context.isAuthenticated

    if (!isAuthenticated) {
        throw new Error(`Authentication failed`);
    }

    if (isAuthenticated && currentUser === userName) {
        await data(config.collectionName).updateOne(
            { "_id": new ObjectId(commentId) },
            { $pull: { "replies": { "_id": replyId } } }
        );
    }

    return "Reply deleted";
})