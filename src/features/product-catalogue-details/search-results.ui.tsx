import React from 'react';
import { Link, LinkDisplay, importUI } from "@magicjs.dev/frontend";
import useSearchResultHook from "./search-results.hook"

const Header = importUI("@mern.ai/standard-header")
const Footer = importUI("@mern.ai/standard-footer")

export default function SearchResults() {
    const hook = useSearchResultHook()

    if (hook.loading) {
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
            {
                hook.items.length > 0 ? (
                    <section className="text-gray-600 body-font min-h-screen">
                        <div className="py-4 lg:py-10 sm:px-32 lg:px-40 px-4">
                            <div className="flex flex-wrap w-full mb-4 pb-4">
                                <div className="w-full mb-6 lg:mb-0">
                                    <h1 className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">Search Result for "{hook.keyword}"</h1>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-4 lg:gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {
                                    hook.items?.map((item, index) => {
                                        return (
                                            <LinkDisplay pageId='catalogueDetails' params={{ itemId: item._id }} key={index}>
                                                {
                                                    (props) =>
                                                        <Link to={props.url}>
                                                            {item?.ImgId ? (
                                                                <img src={hook.imageSrc.getLink(item.ImgId)} className="h-[330px] 2xl:w-64 lg:mr-5 mb-7 lg:mb-0 object-cover" />
                                                            ) : (
                                                                <div className='h-[330px] 2xl:w-64 bg-[#f7f7f7] flex items-center justify-center'>
                                                                    <svg className="h-8 w-10 text-[#808080bd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <circle cx="8.5" cy="8.5" r="1.5" />  <polyline points="21 15 16 10 5 21" /></svg>
                                                                </div>
                                                            )}
                                                            <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                                                        </Link>
                                                }
                                            </LinkDisplay>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                ) : (
                    <div className="h-screen bg-gray-100 flex items-center">
                        <div className="w-full flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                            <div className="max-w-md flex flex-col items-center">
                                <div className="text-5xl font-dark font-bold">No item to show</div>
                                <p className="mb-8">you can find plenty of other things on our homepage.</p>
                                <LinkDisplay pageId='homepage'>
                                    {
                                        ({ url }) => (
                                            <Link to={url} className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
                                                Back to homepage
                                            </Link>
                                        )
                                    }
                                </LinkDisplay>
                            </div>
                        </div>
                    </div >
                )
            }
            <Footer />
        </>
    )
};