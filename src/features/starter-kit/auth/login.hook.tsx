import React, { useState } from 'react';
import login from './login.server';
import { createSrc } from '@magicjs.dev/frontend';
import getLogoServer from '../project-settings/get-logo.server';

export default function () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const imageSrc = createSrc(getLogoServer);

    const handleLogin = React.useCallback(async () => {
        if (!username)
            return setErr('Username is required');

        if (!password)
            return setErr('Password is required');

        setLoading(true);
        setErr('');

        try {
            await login(username, password).then((res) => {
                if (res.isSuperAdmin) {
                    window.location.replace('/admin')
                } else {
                    window.location.replace('/')
                }
            })
        } catch (e: any) {
            setErr(e?.message)
            setLoading(false);
        }

    }, [username, password]);

    return {
        username,
        setUsername,
        password, setPassword,
        loading,
        handleLogin,
        err,
        imageSrc
    }
}