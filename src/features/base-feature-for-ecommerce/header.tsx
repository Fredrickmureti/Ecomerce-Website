import React, { Fragment } from 'react';
import { Link, LinkDisplay, useLogin, importUI } from "@magicjs.dev/frontend";
import { Transition, Menu, Dialog } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useHeaderHook from './header.hook';

const Widget = importUI("@mern.ai/search-widget")

export default function Header() {
  const hook: any = useHeaderHook();
  const { current } = useLogin()

  return (
    <>
      <div>
        <header className="h-16 relative inset-x-0 top-0 z-40 px-4 bg-white sm:px-32 border-b border-slate-200">
          <nav className="h-16 flex items-center justify-between lg:px-8" aria-label="Global">
            <Link to={'/'} className="h-10 w-32 sm:w-36 flex items-center">
              <img
                src={hook.imageSrc.getLink()}
                className="h-full w-full object-contain object-left"
              />
            </Link>
            <div className="flex items-center gap-2 lg:gap-7">
              <Widget />
              {
                current.isAuthenticated === false ? (
                  <div className="flex items-center gap-7">
                    <LinkDisplay pageId='login'>
                      {
                        ({ url }) => (
                          <Link to={url} className="text-sm font-medium leading-6 text-[#393939] hover:opacity-80">
                            Sign In
                          </Link>
                        )
                      }
                    </LinkDisplay>
                    <LinkDisplay pageId="signup">
                      {
                        ({ url }) => (
                          <Link to={url} className="w-25 h-10 gap-2 sm:gap-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg hover:opacity-80 disabled:bg-gray-200" >
                            Sign Up
                            <svg className="w-1.5 h-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                            </svg>
                          </Link>
                        )
                      }
                    </LinkDisplay>
                  </div>
                ) : (
                  <div className="flex items-center gap-7">
                    {
                      hook.isSuperAdmin ? (
                        <LinkDisplay pageId='adminDashboard'>
                          {
                            ({ url }) => (
                              <Link to={url}
                                className="text-sm font-medium leading-6 text-[#393939] hover:opacity-80 lg:block hidden md:block"
                              >
                                Go to Dashboard
                              </Link>
                            )
                          }
                        </LinkDisplay>
                      ) : null
                    }
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:opacity-80">
                          <div className="truncate w-[100px]">
                            {`Hi, ${current?.currentUser?.name}`}
                          </div>
                          <ChevronDownIcon className="-mr-1 h-5 w-5 text-black" aria-hidden="true" />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {
                              hook.isSuperAdmin ? (
                                <Menu.Item>
                                  <LinkDisplay pageId='adminDashboard'>
                                    {
                                      ({ url }) => (
                                        <Link to={url}
                                          className="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm block lg:hidden"
                                        >
                                          Dashboard
                                        </Link>
                                      )
                                    }
                                  </LinkDisplay>
                                </Menu.Item>
                              ) : null
                            }
                            <Menu.Item>
                              <LinkDisplay pageId='userDashboard'>
                                {
                                  ({ url }) => (
                                    <Link to={url}
                                      className="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                    >
                                      User Dashboard
                                    </Link>
                                  )
                                }
                              </LinkDisplay>
                            </Menu.Item>
                            <Menu.Item>
                              <LinkDisplay pageId='cart'>
                                {
                                  ({ url }) => (
                                    <Link to={url}
                                      className="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                    >
                                      My Cart
                                    </Link>
                                  )
                                }
                              </LinkDisplay>
                            </Menu.Item>
                            <Menu.Item>
                              <LinkDisplay pageId='orders'>
                                {
                                  ({ url }) => (
                                    <Link to={url}
                                      className="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                    >
                                      My Orders
                                    </Link>
                                  )
                                }
                              </LinkDisplay>
                            </Menu.Item>
                            <Menu.Item>
                              <LinkDisplay pageId='chat'>
                                {
                                  ({ url }) => (
                                    <Link to={url}
                                      className="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                    >
                                      Inbox
                                    </Link>
                                  )
                                }
                              </LinkDisplay>
                            </Menu.Item>
                            <Menu.Item>
                              <LinkDisplay pageId='userProfile'>
                                {
                                  ({ url }) => (
                                    <Link to={url}
                                      className="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                    >
                                      My profile
                                    </Link>
                                  )
                                }
                              </LinkDisplay>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                className="hover:bg-gray-100 text-gray-900 flex items-start px-4 py-2 text-sm w-full"
                                onClick={() => hook.setIsLogoutModalOpen(true)}
                              >
                                Logout
                              </button>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )
              }
            </div>
          </nav>
        </header>
      </div>

      {/* Logout item modal */}
      <Transition.Root show={hook.isLogoutModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => hook.setIsLogoutModalOpen(false)}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
    </>
  )
}