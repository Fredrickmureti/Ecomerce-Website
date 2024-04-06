import { createBackendFunction, data } from "@magicjs.dev/backend";
import config from './config.json';

export default createBackendFunction(async function (itemId) {
    const comments = await data(config.collectionName).find({ itemId }).sort({ $natural: -1 }).toArray();

    comments.forEach(comment => {
        if (comment.replies) {
            comment.replies.sort((a, b) => b.time - a.time);
        }
    });

    return comments;
})