import { Link, LinkDisplay } from '@magicjs.dev/frontend';
import React from 'react';
import useRegisterHook from './register.hook';

export default function Register() {
    const hook = useRegisterHook();

    return (
        <div className="relative flex min-h-screen flex-col bg-white px-4 py-12 lg:px-8">
            <Link to={'/'} className="absolute top-[12px] sm:left-[118px] lg:left-[161px] h-10 w-32 sm:w-36 flex items-center">
              <img
                src={hook.imageSrc.getLink()}
                className="h-full w-full object-contain object-left"
              />
            </Link>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex flex-col gap-[20px]">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input
                                id="name"
                                value={hook.name}
                                onChange={(e) => hook.setName(e.target.value)}
                                type="text"
                                required
                                disabled={hook.enableOTP}
                                className="block disabled:opacity-50 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                value={hook.username}
                                onChange={(e) => hook.setUsername(e.target.value)}
                                type='email'
                                required
                                disabled={hook.enableOTP}
                                className="block disabled:opacity-50 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                value={hook.password}
                                onChange={(e) => hook.setPassword(e.target.value)}
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    {
                        hook.enableOTP === true ? (
                            (
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">OTP</label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="otp"
                                            value={hook.otp}
                                            onChange={(e) => hook.setOtp(e.target.value)}
                                            type="text"
                                            required
                                            className="block  disabled:opacity-50 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            )
                        ) : null
                    }
                    <div>
                        {
                            hook.err ? (
                                <p className='text-red-500 text-sm'>{hook.err}</p>
                            ) : null
                        }
                    </div>
                    <div>
                        {
                            hook.hasSuperAdmin === false ? (
                                <div className="flex flex-col bg-[#FFFCF5] rounded border border-[#C4BB77] p-[20px]">
                                    <div className='flex gap-4'>
                                        <input
                                            id="confirm-super-admin"
                                            checked={hook.confirmSuperAdmin}
                                            onChange={() => hook.setConfirmSuperAdmin(!hook.confirmSuperAdmin)}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-[2px] focus:ring-2" />
                                        <label htmlFor='confirm-super-admin' className="ms-2 text-sm font-medium text-gray-900">I understand that I am creating a super admin account</label>
                                    </div>
                                    <label htmlFor='confirm-super-admin' className="pl-10 pt-[13px] text-[13px] font-base text-[#716C60]">Super admin account will have the full control and access to this app. It is mandatory for the first user to be a super admin.</label>
                                </div>
                            ) : null
                        }
                    </div>
                    <div>
                        {
                            hook.enableOTP === false && hook.hasSuperAdmin === true ? (
                                <button
                                    onClick={hook.handleVerifyEmail}
                                    disabled={hook.isVerifyButtonDisabled}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:bg-indigo-300">
                                    {
                                        hook.verifyEmailLoading ? (
                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className='pl-2'>Verifying...</span>
                                            </div>
                                        ) : (
                                            "Verify And Continue"
                                        )
                                    }
                                </button>
                            ) : (
                                <button
                                    onClick={hook.handleRegister}
                                    disabled={hook.isCreateButtonDisabled}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:bg-indigo-300">
                                    {
                                        hook.loading ? (
                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className='pl-2'>Creating...</span>
                                            </div>
                                        ) : (
                                            "Create"
                                        )
                                    }
                                </button>
                            )
                        }
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    <LinkDisplay pageId="login">
                        {
                            ({ url }) => (
                                <Link to={url} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-1" >
                                    Sign in
                                </Link>
                            )
                        }
                    </LinkDisplay>
                </p>
            </div>
        </div>
    )
}