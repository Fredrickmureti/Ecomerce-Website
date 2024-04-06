import React, { useRef, useState } from 'react';
import updateProfile from './update-profile.server';
import userInfo from './profile.server';
import { createUploader, createSrc } from '@magicjs.dev/frontend';
import uploadServer from './profile-image-upload.server';
import getImgServer from './get-profile-image.server';
import removeProfile from './remove-profile-image.server';
import updateBasicInfo from './update-basic-info.server';
import updatePassword from './user-password-update.server';

export default function () {
    const [basicInfo, setBasicInfo] = useState<any>(null);
    const [additionalInfo, setAdditionalInfo] = useState<any>(null);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [err, setErr] = useState("");
    const [basicInfoEditMode, setBasicInfoEditMode] = useState(false);
    const [additionalInfoEditMode, setAdditionalInfoEditMode] = useState(false);
    const [passwordEditMode, setPasswordEditMode] = useState(false);
    const [userInfoLoading, setUserInfoLoading] = useState(true);
    const [changeProfileImageModalOpen, setChangeProfileImageModalOpen] = useState(false);
    const [basicInfoUpdateLoading, setBasicInfoUpdateLoading] = useState(false);
    const [additionalInfoUpdateLoading, setAdditionalInfoUpdateLoading] = useState(false);
    const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imageName, setImageName] = useState('');
    const [loading, setLoading] = useState(false);
    const cancelButtonRef = useRef(null);
    const { addFiles, upload } = createUploader(uploadServer);
    const imageSrc = createSrc(getImgServer);

    const handleUpdateAdditionalInfo = React.useCallback(() => {
        setAdditionalInfoUpdateLoading(true)
        updateProfile(additionalInfo).then(() => {
            setAdditionalInfoEditMode(false)
            setAdditionalInfoUpdateLoading(false)
        }).catch((e) => {
            setAdditionalInfoUpdateLoading(false)
        });
    }, [additionalInfo]);

    const handleUpdateBasicInfo = React.useCallback(() => {
        setBasicInfoUpdateLoading(true)
        updateBasicInfo(basicInfo).then(() => {
            setBasicInfoEditMode(false)
            setBasicInfoUpdateLoading(false)
        }).catch((e) => {
            setBasicInfoUpdateLoading(false)
        });
    }, [basicInfo]);

    const handleUpdatePassword = React.useCallback(() => {
        setPasswordUpdateLoading(true)
        setErr('')
        updatePassword(password, newPassword).then(() => {
            setPasswordEditMode(false)
            setPasswordUpdateLoading(false)
        }).catch((e) => {
            setErr(e.message)
            setPasswordUpdateLoading(false)
        });
    }, [password, newPassword]);

    const fetchUserInfo = React.useCallback(() => {
        userInfo().then((res) => {
            setBasicInfo(res.basicInfo)
            setAdditionalInfo(res.additionalInfo)
            setUserInfoLoading(false)
        }).catch(() => {
            setUserInfoLoading(false)
        })
    }, []);

    const handleUploadProfileImage = React.useCallback(() => {
        setLoading(true);
        upload().then(() => {
            fetchUserInfo()
            setChangeProfileImageModalOpen(false)
        });
        setLoading(false)
    }, [upload])

    const handleRemoveProfileImage = React.useCallback(() => {
        removeProfile(additionalInfo?.profileImgId).then(() => {
            fetchUserInfo()
            setChangeProfileImageModalOpen(false)
            setIsImageSelected(false)
        });
    }, [additionalInfo])


    const handleToggleBasicInfoEditMode = () => {
        setBasicInfoEditMode(!basicInfoEditMode);
    };

    const handleToggleAdditionalInfoEditMode = () => {
        setAdditionalInfoEditMode(!additionalInfoEditMode);
    };

    const handleTogglePasswordEditMode = () => {
        setPasswordEditMode(!passwordEditMode);
        setPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
        setErr("")
    };

    const updatePasswordDisabledState = React.useMemo(() => {
        if (!password || !newPassword || newPassword !== confirmNewPassword) {
            return true
        } else {
            return false
        }
    }, [password, newPassword, confirmNewPassword])
    
    const handleBasicInfoChange = (value, field) => {
        setBasicInfo({ ...basicInfo, [field]: value });
    };

    const handleAdditionalInfoChange = (value, field) => {
        setAdditionalInfo({ ...additionalInfo, [field]: value });
    };

    React.useEffect(() => {
        fetchUserInfo()
    }, [])

    return {
        basicInfo, setBasicInfo,
        basicInfoEditMode,
        password, setPassword,
        newPassword, setNewPassword,
        confirmNewPassword, setConfirmNewPassword,
        passwordEditMode,
        additionalInfo, setAdditionalInfo,
        additionalInfoEditMode,
        handleToggleBasicInfoEditMode,
        handleUpdateBasicInfo,
        handleBasicInfoChange,
        handleTogglePasswordEditMode,
        handleToggleAdditionalInfoEditMode,
        handleUpdateAdditionalInfo,
        handleAdditionalInfoChange,
        handleUpdatePassword,
        userInfoLoading,
        changeProfileImageModalOpen, setChangeProfileImageModalOpen,
        cancelButtonRef,
        fetchUserInfo,
        addFiles,
        handleUploadProfileImage,
        handleRemoveProfileImage,
        imageSrc,
        err,
        updatePasswordDisabledState,
        basicInfoUpdateLoading,
        additionalInfoUpdateLoading,
        passwordUpdateLoading,
        isImageSelected, setIsImageSelected,
        imageName, setImageName,
        loading
    }
}