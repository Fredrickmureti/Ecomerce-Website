import { Link, LinkDisplay } from '@magicjs.dev/frontend';
import React from 'react';
import useEditHook from './edit-data.hook';

export default function Edit() {
    const hook = useEditHook();

    return (
        <>
            <div>
                {hook.showAlert && (
                    <div className="relative top-0 left-0 w-full bg-green-50 border-b-2 border-green-500 p-4 text-green-600 lg:pt-[106px] pt-[167px]">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    className="w-5 h-5 text-green-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <div className="ml-3">
                                <div className="text-sm text-green-600">
                                    <p>Edited Successfully.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <header className="bg-white shadow fixed top-0 left-0 right-0 lg:ml-[256px] z-10 lg:pt-0 pt-[60px]">
                    <div className="px-4 py-6 sm:px-12 flex flex-row justify-between items-center">
                        <div className='flex w-9/12 gap-2 items-center'>
                            <LinkDisplay appletId='list-data'>
                                {
                                    ({ url }) => (
                                        <Link to={url} className="mt-1 md:mt-2">
                                            <svg className="w-5 h-4 text-gray-800 hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                            </svg>
                                        </Link>
                                    )
                                }
                            </LinkDisplay>
                            <h1 className="lg:text-2xl sm:text-md w-9/12 xs:text-xs md:text-lg truncate font-bold tracking-tight text-gray-900">{hook.name}</h1>
                        </div>
                        <button
                            disabled={hook.loading || !hook.name}
                            onClick={hook.updateChanges}
                            className='flex items-center bg-[#523EF3] text-xs rounded px-3 py-2 ml-4 text-white disabled:bg-slate-300 disabled:cursor-not-allowed h-[38px] hover:bg-[#4633DE]'>
                            {
                                hook.loading ? (
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className='pl-2'>Saving...</span>
                                    </div>
                                ) : (
                                    "Save changes"
                                )
                            }
                        </button>
                    </div>
                </header>
                <main className={`${hook.showAlert ? "" : "lg:pt-[86px] pt-[147px]"}`}>
                    <div className="px-4 py-6 sm:px-12">
                        <div className="mt-2 mb-7 flex flex-col">
                            <label className="pb-2 text-sm font-medium">Title</label>
                            <input
                                type="text"
                                placeholder='Name'
                                value={hook.name}
                                onChange={(e) => hook.setName(e.target.value)}
                                className="p-2 border-gray-200 rounded-lg text-xs w-80"
                            />
                        </div>
                        <div className="mt-2 mb-7 flex flex-col">
                            <label className="pb-2 text-sm font-medium">Description</label>
                            <textarea
                                placeholder='Description...'
                                value={hook.description}
                                onChange={(e) => hook.setDescription(e.target.value)}
                                className="p-2 border-gray-200 rounded-lg text-sm w-80"
                            />
                        </div>
                        <div className="mt-2 flex flex-col">
                            <label className="pb-2 text-sm font-medium">Image</label>
                            {hook.imageId ? (
                                <img
                                    src={hook.imageSrc.getLink(hook.imageId)}
                                    className="h-96 w-80 mb-7 lg:mb-2 object-cover rounded-lg"
                                />
                            ) : (
                                <div className='mt-2 mb-7 lg:mb-2 w-80'>
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
                            <div>
                                {hook.imageId ? (
                                    <button
                                        className='bg-[white] text-xs rounded px-3 py-2 text-[#CE4B4B] font-medium w-80 h-[41px] border border-solid border-[#E3E3E3]'
                                        onClick={() => hook.handleRemoveImage()}
                                    >
                                        {hook.isButtonLoading ? (
                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className='pl-2'>Removing...</span>
                                            </div>
                                        ) : (
                                            <>
                                                Remove
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    hook.isImageSelected ? (
                                        <button
                                            className='bg-[#2998D3] text-xs rounded px-3 py-2 text-white font-medium w-80 h-[41px]'
                                            onClick={() => hook.handleUploadImage(hook.itemId)}

                                        >
                                            {hook.isButtonLoading ? (
                                                <div role="status">
                                                    <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className='pl-2'>Uploading...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    Upload
                                                </>
                                            )}
                                        </button>
                                    ) : null
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}