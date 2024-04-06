import React, { Fragment } from 'react';
import { Protected, importUI } from '@magicjs.dev/frontend';
import { Dialog, Transition } from '@headlessui/react';
import useUserInfoHook from './profile.hook';
import ProfileImage from './../assets/images/profile-icon.png';
import BackgroundImage from './../assets/images/background-profile.png';
import UploadIcon from "./../assets/icons/upload_icon.svg";
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

const Header = importUI("@mern.ai/standard-header")
const Footer = importUI("@mern.ai/standard-footer")

export default function Profile() {
    const hook = useUserInfoHook();

    if (hook.userInfoLoading) {
        return (
            <div className="text-center">
                <div className="flex h-screen justify-center items-center" role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <Protected>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Header />
            <div className="h-full w-full bg-gray-200 py-8 sm:px-32 lg:px-40 px-4">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="w-full h-[250px]">
                        <img src={BackgroundImage} className="w-full h-full rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div className="flex flex-col items-start -mt-20 pl-[32px]">
                        <div className="relative w-40">
                            <button
                                onClick={() => hook.setChangeProfileImageModalOpen(true)}
                                className="relative group">
                                {hook.additionalInfo?.profileImgId ? (
                                    <img src={hook.imageSrc.getLink(hook.additionalInfo?.profileImgId)} className="w-40 h-40 object-cover border-4 border-white rounded-full bg-white" />
                                ) : (
                                    <img src={ProfileImage} className="w-40 h-40 object-cover border-4 border-white rounded-full bg-white" />
                                )}
                                <div className="absolute inset-0 bg-[black] opacity-0 group-hover:opacity-80 transition-opacity rounded-full"></div>
                                <div
                                    className="absolute bottom-[82px] right-[80px] transform translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg className="h-[35px] w-[35px] text-[white]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />  <circle cx="12" cy="13" r="4" /></svg>
                                </div>
                            </button>
                        </div>
                        <span className="truncate w-2/4 text-2xl">{hook.basicInfo?.name}</span>
                    </div>
                </div>
                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <div className='flex justify-between border-b py-2'>
                                <h4 className="text-xl text-gray-900 font-bold">Basic Info</h4>
                                <button className='flex hover:opacity-800' onClick={hook.handleToggleBasicInfoEditMode}>
                                    {hook.basicInfoEditMode ? (
                                        <svg className="h-5 w-5 text-[black]" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-[black]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                    )}
                                </button>
                            </div>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[50px]">
                                    <span className="font-bold w-44">Full name:</span>
                                    <div className='flex justify-between md:justify-none md:w-2/5'>
                                        {hook.basicInfoEditMode ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={hook.basicInfo?.name}
                                                    onChange={(e) => hook.handleBasicInfoChange(e.target.value, 'name')}
                                                    className="text-gray-700 outline-none border-b border-gray-400 focus:border-blue-500 rounded w-full h-[32px]"
                                                />
                                            </>
                                        ) : (
                                            <span className="text-gray-700 truncate w-2/4">{hook.basicInfo?.name}</span>
                                        )}
                                    </div>
                                </li>
                                <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[50px]">
                                    <span className="font-bold w-44">Email:</span>
                                    <div className='flex justify-between md:justify-none md:w-2/5'>
                                        <span className="text-gray-700">{hook.basicInfo?.username}</span>
                                    </div>
                                </li>
                            </ul>
                            {hook.basicInfoEditMode ? (
                                <div className="flex-1 flex flex-col items-center lg:items-end justify-end mt-2">
                                    <div className="flex items-center space-x-4 mt-2">
                                        <button onClick={hook.handleToggleBasicInfoEditMode} className="flex items-center border text-gray-700 hover:border-gray-500 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                            <span>Cancel</span>
                                        </button>
                                        <button onClick={hook.handleUpdateBasicInfo} className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                            {
                                                hook.basicInfoUpdateLoading ? (
                                                    <div role="status" className='flex items-center'>
                                                        <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className='pl-2'>Saving...</span>
                                                    </div>
                                                ) : (
                                                    "Save"
                                                )
                                            }
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <div className='flex justify-between border-b py-2'>
                                <h4 className="text-xl text-gray-900 font-bold">Password and Security</h4>
                                <button className='flex hover:opacity-800' onClick={hook.handleTogglePasswordEditMode}>
                                    {hook.passwordEditMode ? (
                                        <svg className="h-5 w-5 text-[black]" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    ) : (
                                        <div className="flex items-center border font-medium text-gray-700 hover:border-gray-500 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                            Change
                                        </div>
                                    )}
                                </button>
                            </div>
                            {hook.passwordEditMode ? (
                                <>
                                    <ul className="mt-2 text-gray-700">
                                        <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[50px]">
                                            <span className="font-bold w-44">Current Password:</span>
                                            <div className='flex justify-between md:justify-none md:w-2/5'>
                                                <input
                                                    type="password"
                                                    value={hook.password}
                                                    onChange={(e) => hook.setPassword(e.target.value)}
                                                    className="text-gray-700 outline-none border-b border-gray-400 focus:border-blue-500 rounded w-full h-[32px]"
                                                />
                                            </div>
                                        </li>
                                        <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[50px]">
                                            <span className="font-bold w-44">New Password:</span>
                                            <div className='flex justify-between md:justify-none md:w-2/5'>
                                                <input
                                                    type="password"
                                                    value={hook.newPassword}
                                                    onChange={(e) => hook.setNewPassword(e.target.value)}
                                                    className="text-gray-700 outline-none border-b border-gray-400 focus:border-blue-500 rounded w-full h-[32px]"
                                                />
                                            </div>
                                        </li>
                                        <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[50px]">
                                            <span className="font-bold w-44">Confirm New Password:</span>
                                            <div className='flex justify-between md:justify-none md:w-2/5'>
                                                <input
                                                    type="password"
                                                    value={hook.confirmNewPassword}
                                                    onChange={(e) => hook.setConfirmNewPassword(e.target.value)}
                                                    className={`text-gray-700 outline-none border-b border-gray-400 rounded w-full h-[32px] ${hook.newPassword !== hook.confirmNewPassword ? "focus:ring-red-600 focus:border-red-600" : "focus:ring-blue-500 focus:border-blue-500"}`}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                    {
                                        hook.err ? (
                                            <p className='text-red-500 text-sm ml-56'>{hook.err}</p>
                                        ) : null
                                    }
                                </>
                            ) : (
                                <p className="text-gray-700 mt-4">Last updated at {moment(hook.basicInfo?.passwordLastUpdatedAt).format("lll")}</p>
                            )}
                            {hook.passwordEditMode ? (
                                <div className="flex-1 flex flex-col items-center lg:items-end justify-end mt-2">
                                    <div className="flex items-center space-x-4 mt-2">
                                        <button onClick={hook.handleTogglePasswordEditMode} className="flex items-center border text-gray-700 hover:border-gray-500 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                            <span>Cancel</span>
                                        </button>
                                        <button onClick={hook.handleUpdatePassword} disabled={hook.updatePasswordDisabledState} className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100 disabled:bg-indigo-300">
                                            {
                                                hook.passwordUpdateLoading ? (
                                                    <div role="status" className='flex items-center'>
                                                        <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className='pl-2'>Saving...</span>
                                                    </div>
                                                ) : (
                                                    "Save"
                                                )
                                            }
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <div className='flex justify-between border-b py-2'>
                                <h4 className="text-xl text-gray-900 font-bold">Additional Info</h4>
                                <button className='flex hover:opacity-800' onClick={hook.handleToggleAdditionalInfoEditMode}>
                                    {hook.additionalInfoEditMode ? (
                                        <svg className="h-5 w-5 text-[black]" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-[black]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                    )}
                                </button>
                            </div>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[60px]">
                                    <span className="font-bold w-44">Date Of Birth:</span>
                                    <div className='flex justify-between md:justify-none md:w-2/5'>
                                        {hook.additionalInfoEditMode ? (
                                            <>
                                                <input
                                                    value={hook.additionalInfo?.dob}
                                                    onChange={(e) => hook.handleAdditionalInfoChange(e.target.value, 'dob')}
                                                    className="text-gray-700 outline-none border-b border-gray-400 focus:border-blue-500 rounded w-full h-[32px]"
                                                    id="date" type="date" placeholder="Select a date"
                                                />
                                            </>
                                        ) : (
                                            <span className="text-gray-700">{hook.additionalInfo?.dob}</span>
                                        )}
                                    </div>
                                </li>
                                <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[60px]">
                                    <span className="font-bold w-44">Location:</span>
                                    <div className='flex justify-between md:justify-none md:w-2/5'>
                                        {hook.additionalInfoEditMode ? (
                                            <input
                                                type="text"
                                                value={hook.additionalInfo?.location}
                                                onChange={(e) => hook.handleAdditionalInfoChange(e.target.value, 'location')}
                                                className="text-gray-700 outline-none border-b border-gray-400 focus:border-blue-500 rounded w-full h-[32px]"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{hook.additionalInfo?.location}</span>
                                        )}
                                    </div>
                                </li>
                                <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[60px]">
                                    <span className="font-bold w-44">Education:</span>
                                    <div className='flex justify-between md:justify-none md:w-2/5'>
                                        {hook.additionalInfoEditMode ? (
                                            <input
                                                type="text"
                                                value={hook.additionalInfo?.education}
                                                onChange={(e) => hook.handleAdditionalInfoChange(e.target.value, 'education')}
                                                className="text-gray-700 outline-none border-b border-gray-400 focus:border-blue-500 rounded w-full h-[32px]"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{hook.additionalInfo?.education}</span>
                                        )}
                                    </div>
                                </li>
                                <li className="flex py-2 flex-col md:flex-row gap-[10px] md:gap-[60px]">
                                    <span className="font-bold w-44">Interests/Hobbies:</span>
                                    <div className='flex justify-between md:justify-none md:w-2/5'>
                                        {hook.additionalInfoEditMode ? (
                                            <input
                                                type="text"
                                                value={hook.additionalInfo?.interests}
                                                onChange={(e) => hook.handleAdditionalInfoChange(e.target.value, 'interests')}
                                                className="text-gray-700 outline-none border-b border-gray-400 focus:border-blue-500 rounded w-full h-[32px]"
                                            />
                                        ) : (
                                            <span className="text-gray-700">{hook.additionalInfo?.interests}</span>
                                        )}
                                    </div>
                                </li>
                            </ul>
                            {hook.additionalInfoEditMode ? (
                                <div className="flex-1 flex flex-col items-center lg:items-end justify-end mt-2">
                                    <div className="flex items-center space-x-4 mt-2">
                                        <button onClick={hook.handleToggleAdditionalInfoEditMode} className="flex items-center border text-gray-700 hover:border-gray-500 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                            <span>Cancel</span>
                                        </button>
                                        <button onClick={hook.handleUpdateAdditionalInfo} className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                            {
                                                hook.additionalInfoUpdateLoading ? (
                                                    <div role="status" className='flex items-center'>
                                                        <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className='pl-2'>Saving...</span>
                                                    </div>
                                                ) : (
                                                    "Save"
                                                )
                                            }
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Transition.Root show={hook.changeProfileImageModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={hook.cancelButtonRef} onClose={hook.setChangeProfileImageModalOpen}>
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
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-6">
                                        <div>
                                            <div className="mt-3 sm:ml-4 sm:mt-0 ">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-[10px] flex justify-between">
                                                    <span>Change profile picture</span>
                                                    <svg onClick={() => hook.setChangeProfileImageModalOpen(false)} className="h-5 w-5 text-[#363636]" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                </Dialog.Title>
                                                <div className="mt-4 flex flex-col items-center justify-around h-[344px]">
                                                    <div className='flex flex-col items-center'>
                                                        <label className="pb-2 text-sm font-medium">Choose a picture to upload</label>
                                                        <span className='text-[#717171] text-[13px] mb-[20px]'>Browse and upload a profile picture from your device</span>
                                                        {hook.additionalInfo?.profileImgId ? (
                                                            <img
                                                                src={hook.imageSrc.getLink(hook.additionalInfo?.profileImgId)}
                                                                className="lg:h-[200px] h-[210px] xl:w-[75%] 2xl:w-[50%] w-full mb-7 lg:mb-7 object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className='mt-2 mb-7 lg:mb-7 w-[330px]'>
                                                                <label className="flex w-full cursor-pointer appearance-none items-center justify-between rounded-md border-2 border-dashed border-gray-200 p-[15px] transition-all hover:border-primary-300">
                                                                    <div className="text-gray-600 text-sm" id="fileInputLabel">
                                                                        {hook.isImageSelected ? hook.imageName : `No file chosen yet`}
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="sm:h-[41px] h-[35px] font-medium text-[13px] bg-[#FFFFFF] text-[#1C274C] px-4 py-2 rounded-[5px] ml-2 border border-[#E3E3E3] hover:opacity-80"
                                                                        onClick={() => {
                                                                            const fileInput = document.getElementById('fileInput');
                                                                            if (fileInput) {
                                                                                fileInput.click();
                                                                            }
                                                                        }}
                                                                    >
                                                                        Browse
                                                                    </button>
                                                                    <input
                                                                        type="file"
                                                                        id="fileInput"
                                                                        className="sr-only"
                                                                        onChange={(e: any) => {
                                                                            const selectedFile = e.target.files?.[0];
                                                                            if (selectedFile && selectedFile.name) {
                                                                                const fileName = selectedFile.name.length > 20
                                                                                    ? selectedFile.name.slice(0, 20) + '...'
                                                                                    : selectedFile.name;

                                                                                const fileInputLabel = document.getElementById('fileInputLabel');

                                                                                if (fileInputLabel) {
                                                                                    fileInputLabel.innerText = fileName;
                                                                                }
                                                                                hook.setImageName(fileName)
                                                                                hook.setIsImageSelected(true)
                                                                                hook.addFiles(e.target.files);
                                                                            }
                                                                        }}
                                                                    />
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {hook.additionalInfo?.profileImgId ? (
                                                            <button
                                                                className='bg-[white] text-xs rounded px-3 py-2 text-[#CE4B4B] font-medium w-[330px] h-[41px] border border-solid border-[#E3E3E3]'
                                                                onClick={() => hook.handleRemoveProfileImage()}
                                                            >
                                                                Remove
                                                            </button>
                                                        ) : (
                                                            hook.isImageSelected ? (
                                                                <button
                                                                    className='bg-[#2998D3] text-xs rounded px-3 py-2 text-white font-medium flex items-center justify-center w-[330px] gap-[9px] h-[41px]'
                                                                    onClick={() => hook.handleUploadProfileImage()}

                                                                >
                                                                    {hook.loading ? (
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                            </svg>
                                                                            <span className='pl-2'>Uploading...</span>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <UploadIcon /> Upload
                                                                        </>
                                                                    )}
                                                                </button>
                                                            ) : null
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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