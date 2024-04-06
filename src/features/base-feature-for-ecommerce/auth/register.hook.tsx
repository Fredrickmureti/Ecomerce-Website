import React, { useState } from 'react';
import register from './register.server';
import superAdminCheck from './super-admin-check.server';
import validateEmail from './validate-new-user-email.server';
import { createSrc } from '@magicjs.dev/frontend';
import getLogoServer from '../project-settings/get-logo.server';

export default function () {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);
    const [hasSuperAdmin, setHasSuperAdmin] = useState(true)
    const [confirmSuperAdmin, setConfirmSuperAdmin] = useState(false)
    const [hashedOtp, setHashedOtp] = useState('');
    const [otp, setOtp] = useState('');
    const [enableOTP, setEnableOTP] = useState(false)
    const imageSrc = createSrc(getLogoServer);

    const isEmailValid = (username) => {
        const emailRegex = /^[^\s@]+@[^\s@]+$/;
        return emailRegex.test(username);
    };

    const handleRegister = React.useCallback(async () => {
        if (!name)
            return setErr('Name is required');

        if (!username || !isEmailValid(username))
            return setErr('Valid email is required');

        if (!password)
            return setErr('Password is required');

        setLoading(true);
        setErr('');

        try {
            await register(name, username, password, otp, hashedOtp).then((res) => {
                if (res.isSuperAdmin) {
                    window.location.replace('/admin')
                } else {
                    window.location.replace('/')
                }
            });
        } catch (e: any) {
            setErr(e?.message)
            setLoading(false);
        }
    }, [name, username, password, otp, hashedOtp]);

    const isVerifyButtonDisabled = React.useMemo(() => {
        if (verifyEmailLoading === true) {
            return true
        } else if (hasSuperAdmin === false && confirmSuperAdmin === false) {
            return true
        } else {
            return false
        }
    }, [hasSuperAdmin, verifyEmailLoading, confirmSuperAdmin, otp])

    const isCreateButtonDisabled = React.useMemo(() => {
        if (loading === true) {
            return true
        } else if (hasSuperAdmin === false && confirmSuperAdmin === false) {
            return true
        } else if (hasSuperAdmin === true && !otp) {
            return true
        }
        else {
            return false
        }
    }, [hasSuperAdmin, loading, confirmSuperAdmin, otp])

    const checkHasSuperAdmin = React.useCallback(() => {
        superAdminCheck().then((hasSuperAdmin) => {
            setHasSuperAdmin(hasSuperAdmin)
        })
    }, [])

    const handleVerifyEmail = React.useCallback(() => {
        if (!name)
            return setErr('Name is required');

        if (!username || !isEmailValid(username))
            return setErr('Valid email is required');

        if (!password)
            return setErr('Password is required');

        setVerifyEmailLoading(true)
        setErr('');

        validateEmail(username).then((res) => {
            setHashedOtp(res);
            setEnableOTP(true)
            setErr('')
            setVerifyEmailLoading(false)
        }).catch((e) => {
            setVerifyEmailLoading(false)
            setErr(e.message)
        });
    }, [username, name, username, password]);

    React.useEffect(() => {
        checkHasSuperAdmin()
    }, [])

    return {
        name,
        setName,
        username,
        setUsername,
        password, setPassword,
        loading,
        handleRegister,
        err,
        hasSuperAdmin,
        confirmSuperAdmin, setConfirmSuperAdmin,
        isVerifyButtonDisabled,
        handleVerifyEmail,
        otp, setOtp,
        enableOTP,
        verifyEmailLoading,
        isCreateButtonDisabled,
        imageSrc
    }
}