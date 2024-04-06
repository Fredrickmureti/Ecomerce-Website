import React, { Fragment } from 'react';
import useListHook from './users-list.hook';
import { Table } from 'antd';
import { Dialog, Transition, Menu } from '@headlessui/react'
import moment from 'moment';
import PlusIcon from '../assets/icons/plus-icon.svg';

export default function FormList() {
    const hook = useListHook();
    const TdStyle = {
        TdButton: `inline-block py-1.5 px-5 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-medium text-left`
    }

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <div style={{ width: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</div>,
        },
        {
            title: 'Email',
            dataIndex: 'username',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            responsive: ['md'],
            render: (roles) => {
                const rolesString = roles.join(', ');
                return (
                    <span>{rolesString}</span>
                )
            }
        },
        {
            title: 'Password Last Updated',
            dataIndex: 'passwordLastUpdatedAt',
            responsive: ['md'],
            render: (passwordLastUpdatedAt) => {
                return (
                    <>
                        {
                            passwordLastUpdatedAt ? (
                                <span>{moment(passwordLastUpdatedAt).fromNow()}</span>
                            ) : (
                                <span className='text-[#adacac]'>Password not set</span>
                            )
                        }

                    </>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: '_id',
            align: "right",
            render: (_, data) => (
                <>
                    <div className="flex justify-end">
                        <Menu as="div" className="relative ml-3 flex w-10 align-end">
                            <div>
                                <Menu.Button className="text-dark hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-2 py-1.5">
                                    <span className="text-md">...</span>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute w-max right-0 z-10 mt-8 p-1 flex flex-col rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        <button onClick={() => hook.openEditModal(data)} className={TdStyle.TdButton}>
                                            Edit
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button onClick={() => hook.openUpdatePasswordModal(data)} className={TdStyle.TdButton}>
                                            Update Password
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button onClick={() => hook.openAttachRoleModal(data)} className={TdStyle.TdButton}>
                                            Manage role
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button onClick={() => hook.openDeleteModal(data._id)} className={TdStyle.TdButton}>
                                            Delete
                                        </button>
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </>
            ),
        },
    ];


    return (
        <>
            <div>
                <header className="bg-white shadow fixed top-0 left-0 right-0 lg:ml-[256px] z-10 lg:pt-0 pt-[60px]">
                    <div className="px-4 py-6 sm:px-12 flex flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Users</h1>
                        <button onClick={() => hook.openAddUserModal()} className='bg-[#523EF3] text-xs rounded px-3 py-2 ml-4 text-white h-[38px] hover:bg-[#4633DE] flex items-center'>
                            <div className="pr-2" >
                                <PlusIcon />
                            </div>
                            Add User
                        </button>
                    </div>
                </header>
                <main className='pt-[86px]'>
                    <div className="px-4 py-6 sm:px-12">
                        <section className='bg-white dark:bg-dark flex'>
                            <div className='w-full'>
                                <Table
                                    size="small"
                                    rowKey={(item) => item._id}
                                    columns={columns}
                                    dataSource={hook.users}
                                />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            {/* Create new user modal */}
            <Transition.Root show={hook.addUserModelOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={hook.cancelButtonRef} onClose={() => hook.setAddUserModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-200">
                                        <h3 className="font-bold text-gray-800">
                                            Add new user
                                        </h3>
                                        <button
                                            onClick={() => {
                                                hook.setAddUserModalOpen(false)
                                                hook.setErr("")
                                            }}
                                            type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                            <span className="sr-only">Close</span>
                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <form className="space-y-6" action="#" method="POST">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div>
                                                <div className="overflow-y-auto mt-3">
                                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mb-1">Name:</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        value={hook.name}
                                                        onChange={(e) => hook.setName(e.target.value)}
                                                        className="block w-full p-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-lg text-sm"
                                                        placeholder="Name"
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="overflow-y-auto mt-3">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-1">Email:</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={hook.email}
                                                        onChange={(e) => hook.setEmail(e.target.value)}
                                                        className="block w-full p-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-lg text-sm"
                                                        placeholder="Email"
                                                        autoFocus
                                                    />
                                                </div>
                                                {
                                                    hook.err ? (
                                                        <p className='text-red-400 text-sm'>{hook.err}</p>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                        <div className="border-t dark:border-gray-200 px-4 py-3 flex justify-end items-end">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={() => {
                                                    hook.setAddUserModalOpen(false)
                                                    hook.setErr("")
                                                }}
                                                ref={hook.cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                disabled={hook.addUserDisabledState}
                                                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-200 ml-2"
                                                onClick={hook.addNewUser}
                                            >
                                                {
                                                    hook.isButtonLoading ? (
                                                        <span className='pl-2'>Adding...</span>
                                                    ) : (
                                                        "Add"
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* Create password modal */}
            <Transition.Root show={hook.isUpdatePasswordModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={hook.cancelButtonRef} onClose={() => hook.setIsUpdatePasswordModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-200">
                                        <h3 className="font-bold text-gray-800">
                                            Update Password
                                        </h3>
                                        <button
                                            onClick={() => {
                                                hook.setIsUpdatePasswordModalOpen(false)
                                                hook.setConfirmPassword("")
                                                hook.setErr("")
                                            }}
                                            type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                            <span className="sr-only">Close</span>
                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <form className="space-y-6" action="#" method="POST">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div>
                                                <div className="overflow-y-auto mt-3">
                                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mb-1">Password:</label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        value={hook.selectedUser?.password}
                                                        onChange={(e) => hook.handleUserInfoChange(e.target.value, 'password')}
                                                        className="block w-full p-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-lg text-sm"
                                                        placeholder="Password"
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="overflow-y-auto mt-3">
                                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900 mb-1">Confirm Password:</label>
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        value={hook.confirmPassword}
                                                        onChange={(e) => hook.setConfirmPassword(e.target.value)}
                                                        className={`block w-full p-2 border-gray-200 focus:outline-none rounded-lg text-sm ${hook.selectedUser?.password !== hook.confirmPassword ? "focus:ring-red-600 focus:border-red-600" : "focus:ring-blue-500 focus:border-blue-500"}`}
                                                        placeholder="Confirm Password"
                                                        autoFocus
                                                    />
                                                </div>
                                                {
                                                    hook.err ? (
                                                        <p className='text-red-400 text-sm'>{hook.err}</p>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                        <div className="border-t dark:border-gray-200 px-4 py-3 flex justify-end items-end">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={() => {
                                                    hook.setIsUpdatePasswordModalOpen(false)
                                                    hook.setConfirmPassword("")
                                                    hook.setErr("")
                                                }}
                                                ref={hook.cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                disabled={!hook.selectedUser?.password || hook.isButtonLoading}
                                                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-200 ml-2"
                                                onClick={hook.handleUpdatePassword}
                                            >
                                                {
                                                    hook.isButtonLoading ? (
                                                        <div role="status">
                                                            <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                            <span className='pl-2'>Updating...</span>
                                                        </div>
                                                    ) : (
                                                        "Update"
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* Remove user modal */}
            <Transition.Root show={hook.isDeleteItemModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={hook.cancelButtonRef} onClose={() => hook.setIsDeleteItemModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-200">
                                        <h3 className="font-bold text-gray-800">
                                            Delete user
                                        </h3>
                                        <button
                                            onClick={() => hook.setIsDeleteItemModalOpen(false)}
                                            type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                            <span className="sr-only">Close</span>
                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="bg-white p-4">
                                        <div>
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-700">
                                                    Are you sure you want to delete this user?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t dark:border-gray-200 px-4 py-3 flex justify-end items-end">
                                        <button
                                            onClick={() => hook.setIsDeleteItemModalOpen(false)}
                                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => hook.handleDelete()}
                                            className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:bg-red-300 ml-2">
                                            {
                                                hook.isButtonLoading ? (
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className='pl-2'>Deleting...</span>
                                                    </div>
                                                ) : (
                                                    "Confirm"
                                                )
                                            }
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* Edit user info modal */}
            <Transition.Root show={hook.isEditItemModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={hook.cancelButtonRef} onClose={() => hook.setIsEditItemModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-200">
                                        <h3 className="font-bold text-gray-800">
                                            Edit
                                        </h3>
                                        <button
                                            onClick={() => {
                                                hook.setIsEditItemModalOpen(false)
                                                hook.setErr("")
                                            }}
                                            type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                            <span className="sr-only">Close</span>
                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <form action="#" method="POST">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div>
                                                <div className="overflow-y-auto mt-3">
                                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mb-1">Name:</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        value={hook.selectedUser?.name}
                                                        onChange={(e) => hook.handleUserInfoChange(e.target.value, 'name')}
                                                        className="block w-full p-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-lg text-sm"
                                                        placeholder="Name"
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="overflow-y-auto mt-3">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-1">Email:</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={hook.selectedUser?.username}
                                                        onChange={(e) => hook.handleUserInfoChange(e.target.value, 'username')}
                                                        className="block w-full p-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-lg text-sm"
                                                        placeholder="Email"
                                                        autoFocus
                                                    />
                                                </div>
                                                {
                                                    hook.err ? (
                                                        <p className='text-red-400 text-sm'>{hook.err}</p>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                        <div className="border-t dark:border-gray-200 px-4 py-3 flex justify-end items-end">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={() => {
                                                    hook.setIsEditItemModalOpen(false)
                                                    hook.setErr("")
                                                }}
                                                ref={hook.cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-200 ml-2"
                                                onClick={hook.handleEdit}
                                                disabled={!hook.selectedUser?.name || !hook.selectedUser?.username || hook.isButtonLoading}
                                            >
                                                {
                                                    hook.isButtonLoading ? (
                                                        <div role="status">
                                                            <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                            <span className='pl-2'>Updating...</span>
                                                        </div>
                                                    ) : (
                                                        "Update"
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* Manage user role modal */}
            <Transition.Root show={hook.isAttachRoleModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={hook.cancelButtonRef} onClose={() => hook.setIsisAttachRoleModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-200">
                                        <h3 className="font-bold text-gray-800">
                                            Manage Roles
                                        </h3>
                                        <button
                                            onClick={() => { hook.setIsisAttachRoleModalOpen(false) }}
                                            type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                            <span className="sr-only">Close</span>
                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mb-1">Add Role</label>
                                        <div className='flex flex-row'>
                                            <input
                                                type="text"
                                                id="name"
                                                value={hook.role}
                                                onChange={(e) => hook.setRole(e.target.value)}
                                                className="block w-full p-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-lg text-sm"
                                                placeholder="eg: ADMIN"
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-200 ml-2"
                                                onClick={hook.handleAttachRole}
                                                disabled={!hook.role || hook.isButtonLoading}
                                            >
                                                {
                                                    hook.isButtonLoading ? (
                                                        <div role="status">
                                                            <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        "Add"
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className='border-b dark:border-gray-200' />
                                    <div className="bg-white py-5">
                                        <h4 className="block text-sm font-medium leading-6 text-gray-900 mb-1 px-4">Attached Roles</h4>
                                        <div className='max-h-[200px] overflow-auto mb-3 px-4'>
                                            {
                                                hook.selectedUser?.roles.length > 0 ? (
                                                    hook.selectedUser.roles.map((role, index) => {
                                                        return (
                                                            <div key={index} className='flex flex-row justify-between mt-2 items-center'>
                                                                <span className="block text-xs font-medium leading-6 text-gray-900 mb-1">{role}</span>
                                                                <button
                                                                    onClick={() => hook.handleDetachhRole(role)}
                                                                    type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                                                    <span className="sr-only">Close</span>
                                                                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                                </button>
                                                            </div>
                                                        )
                                                    })
                                                ) : (
                                                    <span className='text-xs font-medium leading-6 text-[#999898]'>No Roles attached</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}