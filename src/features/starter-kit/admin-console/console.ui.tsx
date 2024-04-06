import React, { Fragment, useRef } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { Link, LinkDisplay, Mount, Protected, useLogin, useRoute } from '@magicjs.dev/frontend'
import useConsoleHook from './console.hook'
import '../assets/images/logo.png';

export default function AdminConsole() {
    const { current, isCurrentUserInAnyRoles } = useLogin();
    const cancelButtonRef = useRef(null)
    const hook: any = useConsoleHook();
    const { match } = useRoute();
    const { _ } = match;

    if (isCurrentUserInAnyRoles("SUPER_ADMIN") === false) {
        return (
            <div>Unauthorised</div>
        )
    }
    return (
        <Protected>
            <div style={{ height: '100vh' }}>
                <div className="min-h-full bg-white">
                    <Disclosure as="nav" className="bg-[#F9FAFB]">
                        <>
                            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0" aria-label="default-sidebar">
                                <div className="h-full flex justify-between flex-col px-6 py-4 bg-[#F9FAFB]">
                                    <ul className="font-medium text-[15px] mt-3">
                                        <Link to={'/'} className="w-fit h-7 flex items-center mb-9">
                                            <img
                                                src={hook.imageSrc.getLink()}
                                                className="h-full w-full object-contain object-left"
                                            />
                                        </Link>
                                        <div className='overflow-y-auto h-[60vh]'>
                                            {
                                                hook.navigations.map((item) => {
                                                    const selected = window.location.pathname.includes(item.path)
                                                    return (
                                                        <LinkDisplay key={item.path} appletId={item.appletId}>
                                                            {
                                                                ({ url }) => (
                                                                    <Link to={url}
                                                                        className={`h-10 px-2 mb-1 flex items-center text-[14px] text-[#363A43] text-medium rounded-[5px] ${selected ? "bg-[#EFF0FA] text-[#4F3BF3]" : ""} group`}
                                                                    >
                                                                        <span className="flex-1 whitespace-nowrap truncate">{item.label}</span>
                                                                    </Link>
                                                                )
                                                            }
                                                        </LinkDisplay>
                                                    )
                                                })
                                            }
                                        </div>
                                    </ul>
                                    <ul className='mt-[11px]'>
                                        <LinkDisplay pageId='homepage'>
                                            {
                                                ({ url }) => (
                                                    <Link to={url}
                                                        target="_blank"
                                                        className='flex items-center justify-center gap-2 bg-[#FFFFFF] text-[13px] font-medium rounded-[5px] px-3 py-2 text-[#363A43] w-full h-[38px] mb-5 hover:opacity-80 border border-[#E7E4F5]'
                                                    >
                                                        Open App
                                                        <svg className="h-4 w-4 text-[#363A43]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="17" y1="7" x2="7" y2="17" />  <polyline points="8 7 17 7 17 16" /></svg>
                                                    </Link>
                                                )
                                            }
                                        </LinkDisplay>
                                        <div className="flex items-center border-b border-slate-300 mb-3 pb-3">
                                            <div className="ml-3 w-full">
                                                <div className="text-base w-4/6 truncate font-medium leading-none text-gray-400">{current?.currentUser?.name}</div>
                                                <div className="text-[12px] w-4/6 truncate mt-1 font-medium leading-none text-gray-400">{current?.currentUser?.username}</div>
                                            </div>
                                        </div>
                                        <li>
                                            <a
                                                className="h-10 px-2 flex items-center font-medium text-[15px] text-[#363A43] rounded-[5px] hover:bg-[#EFF0FA] hover:text-[#4F3BF3] group cursor-pointer"
                                                onClick={() => hook.setIsLogoutModalOpen(true)}
                                            >
                                                <span className="flex-1 whitespace-nowrap">Log Out</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </aside>

                            {/* Mobile screen */}
                            <div className="lg:hidden bg-gray-100">
                                <div className="flex overflow-hidden bg-gray-200">
                                    <div
                                        className={`fixed z-20 bg-[#F9FAFB] text-white w-56 min-h-screen overflow-y-auto transition-transform ${hook.isSidebarOpen ? '' : 'transform -translate-x-full'
                                            } ease-in-out duration-300`}
                                        id="sidebar"
                                    >
                                        <div className="p-4 h-screen flex flex-col justify-between">
                                            <ul className="font-medium text-[15px] pt-1">
                                                <button
                                                    className="px-2 mb-3 text-[#363A43] hover:text-[#363A43]"
                                                    id="open-sidebar"
                                                    ref={hook.openSidebarButtonRef}
                                                    onClick={hook.toggleSidebar}
                                                >
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                        ></path>
                                                    </svg>
                                                </button>
                                                <div className='overflow-y-auto h-[66vh] pt-5'>
                                                    <LinkDisplay pageId="userListing">
                                                        {
                                                            ({ url }) => (
                                                                <Link to={url}
                                                                    className={`h-10 px-2 mb-1 flex items-center text-[14px] text-[#363A43] text-medium rounded-[5px] group`}
                                                                >
                                                                    <span className="flex-1 whitespace-nowrap truncate">Users</span>
                                                                </Link>
                                                            )
                                                        }
                                                    </LinkDisplay>
                                                    {
                                                        hook.navigations.map((item) => {
                                                            const selected = window.location.pathname.includes(item.path)
                                                            return (
                                                                <LinkDisplay key={item.path} appletId={item.appletId}>
                                                                    {
                                                                        ({ url }) => (
                                                                            <div
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    hook.toggleSidebar(e);
                                                                                }}
                                                                            >
                                                                                <Link to={url}
                                                                                    className={`h-10 px-2 mb-1 flex items-center text-[14px] text-[#363A43] text-medium rounded-[5px] ${selected ? "bg-[#EFF0FA] text-[#4F3BF3]" : ""} group`}
                                                                                >
                                                                                    <span className="flex-1 whitespace-nowrap truncate">{item.label}</span>
                                                                                </Link>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </LinkDisplay>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </ul>
                                            <ul className='mt-[11px]'>
                                                <LinkDisplay pageId='homepage'>
                                                    {
                                                        ({ url }) => (
                                                            <Link to={url}
                                                                target="_blank"
                                                                className='flex items-center justify-center gap-2 bg-[#FFFFFF] text-[13px] font-medium rounded-[5px] px-3 py-2 text-[#363A43] w-full h-[38px] mb-5 hover:opacity-80 border border-[#E7E4F5]'

                                                            >
                                                                Open App
                                                                <svg className="h-4 w-4 text-[#363A43]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="17" y1="7" x2="7" y2="17" />  <polyline points="8 7 17 7 17 16" /></svg>
                                                            </Link>
                                                        )
                                                    }
                                                </LinkDisplay>
                                                <div className="flex items-center border-b border-slate-300 mb-3 pb-3">
                                                    <div className="ml-3 w-full">
                                                        <div className="text-base w-4/6 truncate font-medium leading-none text-gray-400">{current?.currentUser?.name}</div>
                                                        <div className="text-[12px] w-4/6 truncate mt-1 font-medium leading-none text-gray-400">{current?.currentUser?.username}</div>
                                                    </div>
                                                </div>
                                                <a
                                                    className="h-10 px-2 flex items-center font-medium mt-3 text-[15px] text-[#363A43] rounded-[5px] hover:bg-[#EFF0FA] hover:text-[#4F3BF3] group"
                                                    onClick={() => hook.setIsLogoutModalOpen(true)}
                                                >
                                                    <span className="flex-1 whitespace-nowrap">Log Out</span>
                                                </a>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col overflow-hidden">
                                        <div className="bg-[#F9FAFB] shadow fixed left-0 right-0 z-20">
                                            <div className="w-full mx-auto">
                                                <div className="flex justify-between items-center py-4 px-5">
                                                    <button
                                                        className="text-[#363A43]"
                                                        id="open-sidebar"
                                                        ref={hook.openSidebarButtonRef}
                                                        onClick={hook.toggleSidebar}
                                                    >
                                                        <svg
                                                            className="w-6 h-6"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M4 6h16M4 12h16M4 18h16"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                    <Link to={'/'} className="w-fit h-7 flex items-center">
                                                        <img
                                                            src={hook.imageSrc.getLink()}
                                                            className="h-full w-full object-contain object-right"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </Disclosure>
                    <div className="ml-0 lg:ml-64 lg:pt-0 pt-[60px]">
                        <Mount path={_} />
                    </div>
                </div>
            </div>

            {/* Logout modal */}
            <Transition.Root show={hook.isLogoutModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={() => hook.setIsLogoutModalOpen(false)}>
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
                    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
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
                                            Logout
                                        </h3>
                                        <button
                                            onClick={() => hook.setIsLogoutModalOpen(false)}
                                            type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                            <span className="sr-only">Close</span>
                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="bg-white p-4">
                                        <div>
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-700">
                                                    Are you sure you want to logout?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t dark:border-gray-200 px-4 py-3 flex justify-end items-end">
                                        <button
                                            onClick={() => hook.setIsLogoutModalOpen(false)}
                                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => hook.handleLogout()}
                                            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-300 ml-2">
                                            {
                                                hook.loading ? (
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className='pl-2'>Logging out...</span>
                                                    </div>
                                                ) : (
                                                    "Logout"
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
        </Protected>
    )
}