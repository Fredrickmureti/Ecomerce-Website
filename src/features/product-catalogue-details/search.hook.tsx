import { useParams } from '@magicjs.dev/frontend';
import React from 'react';

export default function () {
    const [keywordInput, setKeyword] = React.useState<any>(``);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { keyword } = useParams();

    React.useEffect(() => {
        const decodedKeyword = decodeURIComponent(keyword);
        if (keyword) {
            setKeyword(`${decodedKeyword}`)
        } else {
            setKeyword('')
        }
    }, [keyword])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return {
        keywordInput, setKeyword,
        openModal,
        closeModal,
        isModalOpen
    }
}