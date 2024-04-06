import React, { useState } from 'react';
import validateEmail from './validate-email.server';
import validateOtp from './validate-otp.server';
import updatePassword from './update-password.server';

export default function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [err, setErr] = useState('');
    const [hashedOtp, setHashedOtp] = useState('');
    const [currentSection, setCurrentSection] = useState('verifyEmail');
    const [showResendButton, setShowResendButton] = useState(false);
    const [counter, setCounter] = useState(60);
    const [loading, setLoading] = useState(false);

    const handleVerifyEmail = React.useCallback(() => {
        setLoading(true)
        setErr('')
        validateEmail(email).then((res) => {
            setHashedOtp(res);
            setCurrentSection("otpVerification");
            setCounter(60);
            setShowResendButton(false);
            setLoading(false)
        }).catch((e) => {
            setErr(e.message)
            setLoading(false)
        });
    }, [email]);

    const handleVerifyOtp = React.useCallback(() => {
        setLoading(true)
        setErr('')
        validateOtp(otp, hashedOtp, email).then(() => {
            setCurrentSection("changePassword");
            setLoading(false)
        }).catch((e) => {
            setErr(e.message)
            setLoading(false)
        });
    }, [otp, hashedOtp, email]);

    const handleUpdatePassword = React.useCallback(() => {
        setLoading(true)
        setErr('')
        updatePassword(otp, hashedOtp, password, email).then(() => {
            window.location.replace('/auth/login')
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        }).catch((e) => {
            setErr(e.message)
            setLoading(false)
        });
    }, [otp, hashedOtp, password, email]);

    const disabledState = React.useMemo(() => {
        if (!password || !confirmPassword || password !== confirmPassword) {
            return true
        } else {
            return false
        }
    }, [password, confirmPassword])

    React.useEffect(() => {
        let interval;
        if (currentSection === "otpVerification") {
            interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        }
        if (counter === 0) {
            clearInterval(interval);
            setShowResendButton(true);
        }
        return () => clearInterval(interval);
    }, [counter, currentSection])

    return {
        currentSection,
        email, setEmail,
        otp, setOtp,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        handleVerifyEmail,
        handleVerifyOtp,
        handleUpdatePassword,
        disabledState,
        err,
        showResendButton,
        counter,
        loading
    }
}