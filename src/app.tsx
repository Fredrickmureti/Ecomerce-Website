import { createServer } from '@magicjs.dev/backend';
import { resolveEnv } from './mern.ai-services/credentials';

export default () => resolveEnv()
.then(() => createServer(async (instance) => {
    await resolveEnv();

    instance.setPort(3000);
}));
