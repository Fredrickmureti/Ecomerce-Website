import React, { useRef, useState } from 'react';
import fetchUsers from "./list-users.server";
import addUser from './add-user.server';
import updatePassword from './admin-password-update.server';
import removeUser from './remove-user.server';
import editUserInfo from './update-user-info.server';
import attachUserRole from './attach-user-role.server';
import detachUserRole from './detach-user-role.server';

export default function () {
    const [addUserModelOpen, setAddUserModalOpen] = useState(false);
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [err, setErr] = useState('');
    const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
    const [isAttachRoleModalOpen, setIsisAttachRoleModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState("");
    const [role, setRole] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const cancelButtonRef = useRef(null)

    const openDeleteModal = React.useCallback((id) => {
        setSelectedItemId(id);
        setIsDeleteItemModalOpen(true)
    }, [])

    const openEditModal = React.useCallback((data) => {
        setSelectedUser(data)
        setIsEditItemModalOpen(true);
    }, [])

    const openAttachRoleModal = React.useCallback((data) => {
        setSelectedUser(data)
        setIsisAttachRoleModalOpen(true);
    }, [])

    const openUpdatePasswordModal = React.useCallback((data) => {
        setSelectedUser(data)
        setIsUpdatePasswordModalOpen(true)
    }, [])

    const openAddUserModal = React.useCallback(() => {
        setName("")
        setEmail("")
        setAddUserModalOpen(true)
    }, [])

    const fetchAllUsers = React.useCallback(() => {
        setLoading(true)
        fetchUsers().then((res) => {
            setUsers(res)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    React.useEffect(() => {
        fetchAllUsers()
    }, [])

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAttachRole = React.useCallback(() => {
        setIsButtonLoading(true);
        if (!role) {
            return setErr('Role is required')
        }
        setErr('');
        attachUserRole(selectedUser._id, role).then((user) => {
            setRole("")
            setIsButtonLoading(false);
            setSelectedUser(user)
            fetchAllUsers()
        }).catch((e) => {
            setIsButtonLoading(false);
        });
    }, [selectedUser, role]);

    const handleDetachhRole = React.useCallback((role) => {
        detachUserRole(selectedUser._id, role).then((user) => {
            setSelectedUser(user)
            fetchAllUsers()
        }).catch((e) => {
        });
    }, [selectedUser]);

    const addNewUser = React.useCallback(async () => {
        if (!name) {
            return setErr('Name is required')
        }
        if (!email || !isEmailValid(email)) {
            return setErr('Valid email is required')
        }

        setErr('');
        setIsButtonLoading(true);

        try {
            await addUser(name, email);
            setAddUserModalOpen(false);
            fetchAllUsers();
            setIsButtonLoading(false);
        } catch (e) {
            setErr(e?.message);
            setIsButtonLoading(false);
        }
    }, [name, email]);

    const handleDelete = React.useCallback(() => {
        setIsButtonLoading(true);
        return removeUser(selectedItemId).then(() => {
            setIsDeleteItemModalOpen(false);
            fetchAllUsers();
            setIsButtonLoading(false);
        }).catch(() => {
            setIsButtonLoading(false);
        })
    }, [selectedItemId])

    const handleEdit = React.useCallback(() => {
        if (!selectedUser?.name) {
            return setErr('Name is required')
        }
        if (!selectedUser?.username || !isEmailValid(selectedUser?.username)) {
            return setErr('Valid email is required')
        }

        setErr('');
        setIsButtonLoading(true);
        editUserInfo(selectedUser._id, selectedUser).then(() => {
            setIsEditItemModalOpen(false);
            fetchAllUsers();
            setIsButtonLoading(false);
        }).catch((e) => {
            setErr(e?.message);
            setIsButtonLoading(false);
        });
    }, [selectedUser]);

    const handleUpdatePassword = React.useCallback(async () => {
        if (selectedUser.password !== confirmPassword) {
            return setErr('Confirm password should be same as password')
        }

        setErr('');
        setIsButtonLoading(true);

        try {
            await updatePassword(selectedUser._id, selectedUser);
            setIsUpdatePasswordModalOpen(false);
            fetchAllUsers();
            setIsButtonLoading(false);
            setConfirmPassword("");
        } catch (e) {
            setErr(e?.message);
            setIsButtonLoading(false);
        }
    }, [selectedUser, confirmPassword]);

    const handleUserInfoChange = (value, field) => {
        setSelectedUser({ ...selectedUser, [field]: value });
    };

    const addUserDisabledState = React.useMemo(() => {
        if (isButtonLoading || !name || !email) {
            return true
        } else {
            return false
        }
    }, [isButtonLoading, name, email])

    return {
        users,
        loading,
        isButtonLoading,
        name, setName,
        email, setEmail,
        confirmPassword, setConfirmPassword,
        err, setErr,
        openAddUserModal,
        cancelButtonRef,
        addUserModelOpen, setAddUserModalOpen,
        isDeleteItemModalOpen, setIsDeleteItemModalOpen,
        isEditItemModalOpen, setIsEditItemModalOpen,
        isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen,
        addUserDisabledState,
        addNewUser,
        handleDelete,
        openDeleteModal,
        handleEdit,
        openEditModal,
        handleUpdatePassword,
        openUpdatePasswordModal,
        handleUserInfoChange,
        selectedUser,
        openAttachRoleModal,
        isAttachRoleModalOpen, setIsisAttachRoleModalOpen,
        role, setRole,
        handleAttachRole,
        handleDetachhRole
    }
}