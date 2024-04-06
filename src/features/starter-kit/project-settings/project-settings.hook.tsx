import React, { useState } from 'react';
import { useParams, createUploader, createSrc, useLogin } from '@magicjs.dev/frontend';
import createCompanyProfile from './update-project-settings.server';
import readCompanyProfile from './read-project-settings.server';
import uploadLogoServer from './upload-logo.server';
import getLogoServer from './get-logo.server';
import removeLogo from './remove-logo.server';

export default function () {
    const [name, setName] = useState('');
    const [imageId, setImageId] = useState('');
    const { itemId } = useParams();
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [projectSettings, setProjectSettings] = useState<any>(null);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imageName, setImageName] = useState('');
    const { addFiles, upload } = createUploader(uploadLogoServer);
    const imageSrc = createSrc(getLogoServer);
    const { current } = useLogin();
    const userId = current.currentUser._id

    const updateCompanyProfile = React.useCallback(async () => {
        setLoading(true);
        try {
            await createCompanyProfile(projectSettings);
            setLoading(false)
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        } catch (e) {
            setLoading(false)
        }
        setLoading(false);
    }, [projectSettings]);

    const handleUploadImage = React.useCallback((userId) => {
        upload().then((res) => {
            fetch()
        });
    }, [upload]);

    const handleRemoveImage = React.useCallback(() => {
        removeLogo(imageId, projectSettings._id).then(() => {
            fetch(),
                setIsImageSelected(false)
        });
    }, [imageId, projectSettings?._id]);

    const fetch = React.useCallback(() => {
        readCompanyProfile(userId).then((res) => {
            setProjectSettings(res)
            setImageId(res?.imageId)
        })
    }, [userId]);

    const projectSettingsOnchange = React.useCallback((value, field) => {
        setProjectSettings(prevSettings => ({ ...prevSettings, [field]: value }));
    }, []);


    React.useEffect(() => {
        fetch();
    }, [fetch]);

    return {
        name, setName,
        loading,
        showAlert,
        upload,
        imageSrc,
        handleUploadImage,
        handleRemoveImage,
        itemId,
        addFiles,
        imageId,
        addCompanyProfile: updateCompanyProfile,
        projectSettings, setProjectSettings,
        isImageSelected, setIsImageSelected,
        imageName, setImageName,
        projectSettingsOnchange
    }
}