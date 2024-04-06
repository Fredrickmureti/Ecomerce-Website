import React from 'react';
import { Link, LinkDisplay, useLogin, importUI } from "@magicjs.dev/frontend";
import useCatalogueDetailsHook from "./catalogue-details.hook";
import { Typography } from 'antd';

const Header = importUI("@mern.ai/standard-header")
const Footer = importUI("@mern.ai/standard-footer")
const Widget = importUI("@mern.ai/add-to-cart-widget")
const Comment = importUI("@mern.ai/standard-comment")

export default function CatalogueDetails() {
    const hook: any = useCatalogueDetailsHook();
    const { current } = useLogin()

    if (hook.isLoading) {
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
        <>
            <Header />
            <div className="min-h-screen py-6 lg:py-8 bg-white sm:px-32 lg:px-40 px-4">
                <div>
                    <nav className="flex mb-8" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <LinkDisplay pageId='homepage'>
                                    {
                                        ({ url }) => (
                                            <Link to={url} className="text-xs font-semibold leading-6 text-[#393939] flex items-center hover:underline">
                                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                                </svg>
                                                Home
                                            </Link>
                                        )
                                    }
                                </LinkDisplay>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <p className="ms-1 text-sm font-medium text-[#393939] md:ms-2 dark:text-[#393939] truncate ... w-[100px]">{hook.item?.name}</p>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="flex flex-col lg:flex-row">
                        {hook.item?.ImgId ? (
                            <img src={hook.imageSrc.getLink(hook.item.ImgId)} className="h-96 w-80 lg:mr-5 mb-7 lg:mb-0 object-cover rounded-lg" />
                        ) : (
                            <div className='h-96 w-80 lg:mr-[45px] mb-7 lg:mb-0 object-cover bg-[#f7f7f7] flex items-center justify-center rounded-lg'>
                                <svg className="h-8 w-10 text-[#808080bd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <circle cx="8.5" cy="8.5" r="1.5" />  <polyline points="21 15 16 10 5 21" /></svg>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <h4 className="pb-[30px] text-base text-gray-700 font-semibold truncate ... w-[300px]">{hook.item?.name}</h4>
                            <Typography.Paragraph className='text-[#505050] text-sm overflow-hidden lg:w-3/5 w-full mb-[20px]' ellipsis={true ? { rows: 7 } : false}>
                                <p dangerouslySetInnerHTML={{ __html: hook.item?.description.replace(/\n/g, '<br>') }}></p>
                            </Typography.Paragraph>
                            {
                                current.isAuthenticated === true ? (
                                    <Widget itemName={hook.item?.name} ImgId={hook.item.ImgId} />
                                ) : (
                                    <LinkDisplay pageId='login'>
                                        {
                                            ({ url }) => (
                                                <Link to={url}>
                                                    <Widget />
                                                </Link>
                                            )
                                        }
                                    </LinkDisplay>
                                )
                            }
                        </div>
                    </div>
                    <Comment itemId={hook.item?._id} />
                </div>
            </div>
            <Footer />
        </>
    )
}; 
