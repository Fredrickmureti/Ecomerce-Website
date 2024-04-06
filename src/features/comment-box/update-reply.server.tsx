import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
const { ObjectId } = require('mongodb');
import config from './config.json';

export default createBackendFunction(async function (commentId, replyId, comment, userName) {
    const context = useFunctionContext(this);
    const currentUser = context.currentUser.username;
    const isAuthenticated = context.isAuthenticated

    if (!isAuthenticated) {
        throw new Error(`Authentication failed`);
    }

    if (isAuthenticated && currentUser === userName) {
        await data(config.collectionName).updateOne(
            { "_id": new ObjectId(commentId), "replies._id": replyId },
            { "$set": { "replies.$.comment": comment, "replies.$.edited": true } }
        )
    }

    return "Reply updated";
})