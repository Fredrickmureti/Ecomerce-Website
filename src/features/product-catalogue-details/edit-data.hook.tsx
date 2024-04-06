import React, { useState } from 'react';
import { useParams, createUploader, createSrc } from '@magicjs.dev/frontend';
import readItem from './read-data.server';
import updateItem from './update-data.server';
import uploadImageServer from './upload-image.server';
import getImageServer from './get-image.server';
import removeProductImage from './remove-image.server';

export default function () {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageId, setImageId] = useState('');
    const { itemId } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imageName, setImageName] = useState('');
    const { addFiles, upload } = createUploader(uploadImageServer);
    const imageSrc = createSrc(getImageServer);

    const handleUploadImage = React.useCallback((itemId) => {
        setIsButtonLoading(true)
        upload(itemId).then((res) => {
            fetch();
            setIsButtonLoading(false);
        }).catch(() => {
            setIsButtonLoading(false)
        });
    }, [upload]);

    const handleRemoveImage = React.useCallback(() => {
        setIsButtonLoading(true)
        removeProductImage(imageId, itemId).then(() => {
            fetch();
            setIsImageSelected(false);
            setIsButtonLoading(false);
        }).catch(() => {
            setIsButtonLoading(false)
        });
    }, [imageId, itemId]);

    const fetch = React.useCallback(() => {
        readItem(itemId).then((res) => {
            setName(res.name)
            setDescription(res.description)
            setImageId(res.ImgId)
        })
    }, [itemId]);

    const updateChanges = React.useCallback(() => {
        setLoading(true)
        updateItem(itemId, { name, description }).then(() => {
            setLoading(false)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 1500);
        }).catch(() => {
            setLoading(false)
        });
    }, [itemId, name, description]);

    React.useEffect(() => {
        fetch();
    }, [fetch]);

    return {
        name, setName,
        updateChanges,
        loading,
        description, setDescription,
        showAlert,
        upload,
        imageSrc,
        handleUploadImage,
        handleRemoveImage,
        itemId,
        addFiles,
        imageId,
        isImageSelected, setIsImageSelected,
        imageName, setImageName,
        isButtonLoading
    }
}