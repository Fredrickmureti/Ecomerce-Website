import { Link, LinkDisplay, loadConfig } from '@magicjs.dev/frontend';
import React, { Fragment, useRef } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react'
import useListHook from './list-data.hook';
import configJson from './config.json';
import { Table } from 'antd';

const config = loadConfig(configJson);

const TdStyle = {
    ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4 bg-black`,
    TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
    TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
    TdButton: `inline-block py-1.5 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-medium text-left`,
    TdButton2: `inline-block py-1.5 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-medium text-left w-[150px] xs:w-auto truncate`
}

export default function List() {
    const hook = useListHook();
    const cancelButtonRef = useRef(null)

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (name, data) => {
                return (
                    <>
                        <div className=" inline-block max-w-30 truncate flex flex-wrap overflow-hidden ...">
                            <p className="font-semibold w-[150px] xs:w-auto truncate">
                                <LinkDisplay appletId='edit-data' params={{ itemId: data._id }}>
                                    {
                                        ({ url }) => <Link className={TdStyle.TdButton2} to={url}>{name}</Link>
                                    }
                                </LinkDisplay>
                            </p>
                        </div>
                    </>
                )
            },
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
                                <Menu.Items className="absolute right-0 z-10 mt-8 p-1 flex flex-col rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 truncate w-3/6">{config.getValue('label')}</h1>
                        <button onClick={() => hook.openAddItemModal()} className='bg-[#523EF3] text-xs rounded px-3 py-2 ml-4 text-white truncate w-[95px] h-[38px] hover:bg-[#4633DE]'>{`Add ${config.getValue('label')}`}</button>
                    </div>
                </header>
                <main className='lg:pt-[86px] pt-[147px]'>
                    <div className="px-4 py-6 sm:px-12">
                        <section className='bg-white dark:bg-dark flex justify-center p-5'>
                            <div className='w-full'>
                                <div className='flex flex-wrap -mx-4'>
                                    <div className='w-full '>
                                        <div className='max-w-full overflow-x-aut'>
                                            <Table
                                                size="small"
                                                rowKey={(item) => item._id}
                                                columns={columns}
                                                dataSource={hook.data}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            {/* Create new item modal */}
            <Transition.Root show={hook.addItemModelOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => hook.setAddItemModalOpen(false)}>
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
                        <div className="flex  ml-0 lg:ml-64 min-h-full items-start justify-center p-4 text-center">
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
                                            Add new item
                                        </h3>
                                        <button
                                            onClick={() => hook.setAddItemModalOpen(false)}
                                            type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                            <span className="sr-only">Close</span>
                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div>
                                            <div className="overflow-y-auto mt-3">
                                                <input
                                                    type="text"
                                                    id="input-item-name"
                                                    value={hook.newItemName}
                                                    onChange={(e) => hook.setNewItemName(e.target.value)}
                                                    className="block w-full p-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-lg text-sm"
                                                    placeholder="Name"
                                                    autoFocus
                                                />
                                            </div>
                                            <div className="overflow-y-auto mt-3">
                                                <textarea
                                                    id="input-item-description"
                                                    value={hook.description}
                                                    onChange={(e) => hook.setDescription(e.target.value)}
                                                    className="block w-full p-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-lg text-sm"
                                                    placeholder="Description..."
                                                    autoFocus
                                                />
                                            </div>
                                            {
                                                hook.newItemErr ? (
                                                    <p className='text-red-400 text-sm'>{hook.newItemErr}</p>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                    <div className="border-t dark:border-gray-200 px-4 py-3 flex justify-end items-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            onClick={() => hook.setAddItemModalOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            disabled={hook.disabledState}
                                            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-200 ml-2"
                                            onClick={hook.addNewItem}
                                        >
                                            {
                                                hook.loading ? (
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className='pl-2'>Adding...</span>
                                                    </div>
                                                ) : (
                                                    "Add"
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

            {/* Delete item modal */}
            <Transition.Root show={hook.deleteItemModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => hook.setDeleteItemModal(false)}>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-200">
                                        <h3 className="font-bold text-gray-800">
                                            Delete item
                                        </h3>
                                        <button
                                            onClick={() => hook.setDeleteItemModal(false)}
                                            type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                            <span className="sr-only">Close</span>
                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="bg-white p-4">
                                        <div>
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-700">
                                                    Are you sure you want to delete this item?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t dark:border-gray-200 px-4 py-3 flex justify-end items-end">
                                        <button
                                            onClick={() => hook.setDeleteItemModal(false)}
                                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => hook.handleDelete()}
                                            className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:bg-red-300 ml-2">
                                            {
                                                hook.loading ? (
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
        </>
    )
}