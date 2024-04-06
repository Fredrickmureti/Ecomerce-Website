import { createBackendFunction, data, useFunctionContext } from "@magicjs.dev/backend";
import moment from 'moment';
import config from './config.json';

export default createBackendFunction(async function (comment, itemId) {
    const context = useFunctionContext(this);
    const isAuthenticated = context.isAuthenticated

    if (!isAuthenticated) {
        throw new Error(`Authentication failed`);
    }

    const userName = context.currentUser.username
    const userId = context.currentUser._id

    try {
        if (isAuthenticated) {
            await data(config.collectionName).insertOne({
                comment,
                replies: [],
                userName,
                userId,
                itemId,
                createdAt: moment.utc().valueOf(),
                edited: false
            });
        }
    } catch (error) {
        throw new Error(error?.message || "Network error");
    }

    return "Comment posted";
})