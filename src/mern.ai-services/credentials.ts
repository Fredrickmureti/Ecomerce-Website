import axios from 'axios';

export async function resolveEnv() {
    const {
        WS_CRED_SERVICE_TENANT_ID,
        WS_CRED_SERVICE_CLIENT_ID,
        WS_CRED_SERVICE_CLIENT_SECRET
    } = process.env || {};

    const shouldResolveEnvVars =
        Boolean(WS_CRED_SERVICE_TENANT_ID) &&
        Boolean(WS_CRED_SERVICE_CLIENT_ID) &&
        Boolean(WS_CRED_SERVICE_CLIENT_SECRET);

    if (!shouldResolveEnvVars) {
        console.warn('Not resolving webspace credentials');
        return;
    }

    const keysToResolve: any[] = Object.keys(process.env)
        .filter((key) => key.startsWith('ws_cred___'))
        .map((k) => ({
            original: k,
            value: process.env[k]
        }));

    console.log(`Resolving ${keysToResolve.length} key`);

    const COMPASS_SRV_URL = "https://compass-services.skyslit.com";

    const res = await axios({
        method: "POST",
        baseURL: COMPASS_SRV_URL,
        url: "/api/v1/resolve-credentials",
        data: {
            tenantId: WS_CRED_SERVICE_TENANT_ID,
            clientId: WS_CRED_SERVICE_CLIENT_ID,
            clientSecret: WS_CRED_SERVICE_CLIENT_SECRET,
            credentialIds: keysToResolve.map((k) => k.value),
        },
    });

    let resolvedValues: any[] = [];

    if (res.data) {
        resolvedValues = res.data.result || [];
    }

    let counter = 0;
    for (const resolvedValue of resolvedValues) {
        counter++;
        const key = keysToResolve.find((k) => k.value === resolvedValue.credId);
        const { original } = key;
        const newKey = String(original).replace('ws_cred___', '');
        process.env[original] = resolvedValue.value;
        process.env[newKey] = resolvedValue.value;
    }

    console.log(`Resolved ${counter} key`);
}