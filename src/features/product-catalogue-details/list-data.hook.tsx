import React, { useState } from 'react';
import createItem from './create-data.server';
import listItem from './list-data.server';
import deleteItem from './delete-data.server';

export default function () {
    const [addItemModelOpen, setAddItemModalOpen] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [description, setDescription] = useState('');
    const [newItemErr, setNewItemErr] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [deleteItemModal, setDeleteItemModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");
    const [loading, setLoading] = React.useState(false);

    const openDeleteModal = React.useCallback((id) => {
        setIdToDelete(id);
        setDeleteItemModal(true)
    }, [])

    const openAddItemModal = React.useCallback(() => {
        setNewItemName("")
        setDescription("")
        setAddItemModalOpen(true)
    }, [])

    const refresh = React.useCallback(() => {
        listItem().then(setData);
    }, []);

    React.useEffect(() => {
        refresh();
    }, []);

    const handleDelete = React.useCallback(() => {
        setLoading(true);
        return deleteItem(idToDelete).then(() => {
            setDeleteItemModal(false)
            refresh()
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }, [idToDelete])

    const addNewItem = React.useCallback(async () => {
        if (!newItemName) {
            return setNewItemErr('Name is required')
        }

        setNewItemErr('');
        setLoading(true);

        try {
            await createItem(newItemName, description);
            setAddItemModalOpen(false);
            refresh();
        } catch (e) {
            setNewItemErr(e?.message);
        }
        setLoading(false);
    }, [newItemName, description]);

    const disabledState = React.useMemo(() => {
        if (loading || !newItemName) {
            return true
        } else {
            return false
        }
    }, [loading, newItemName])

    return {
        addItemModelOpen, setAddItemModalOpen,
        newItemName, setNewItemName,
        addNewItem,
        newItemErr,
        data,
        handleDelete,
        openDeleteModal,
        deleteItemModal,
        setDeleteItemModal,
        openAddItemModal,
        loading,
        description, setDescription,
        disabledState
    }
}