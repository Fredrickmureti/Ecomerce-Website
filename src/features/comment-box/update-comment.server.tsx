import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
const { ObjectId } = require('mongodb');
import config from './config.json';

export default createBackendFunction(async function (commentId, comment, userName) {
    const context = useFunctionContext(this);
    const isAuthenticated = context.isAuthenticated
    const currentUser = context.currentUser.username;

    if (!isAuthenticated) {
        throw new Error(`Authentication failed`);
    }

    if (isAuthenticated && currentUser === userName) {
        await data(config.collectionName).updateOne({ _id: new ObjectId(commentId) }, {
            $set: {
                comment,
                edited: true
            }
        });
        
        return "Comment updated";
    }
})
