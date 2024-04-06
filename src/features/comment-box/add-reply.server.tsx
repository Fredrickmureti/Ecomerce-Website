import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
import moment from 'moment';
const { ObjectId } = require('mongodb');
import config from './config.json';

export default createBackendFunction(async function (commentId, replyComment) {
    const context = useFunctionContext(this);
    const isAuthenticated = context.isAuthenticated

    if (!isAuthenticated) {
        throw new Error(`Authentication failed`);
    }

    const userName = context.currentUser.username
    const userId = context.currentUser._id

    if (isAuthenticated) {
        const newObjectId = String(new ObjectId());
        let comment = {
            userName,
            userId,
            createdAt: moment.utc().valueOf(),
            comment: replyComment,
            _id: newObjectId,
            edited: false
        }

        await data(config.collectionName).updateOne({
            _id: new ObjectId(commentId)
        },
            { $push: { replies: comment } }
        );
    }

    return "Reply posted";
})