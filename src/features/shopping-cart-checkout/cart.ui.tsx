import React from 'react';
import { Link, LinkDisplay, Protected, importUI } from "@magicjs.dev/frontend";
import useCartHook from "./cart.hook";

const Header = importUI("@mern.ai/standard-header")
const Footer = importUI("@mern.ai/standard-footer")

export default function Cart() {
    const hook: any = useCartHook();

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
            <Protected>
                <Header />
                {hook.cart?.items.length >= 1 ? (
                    <div className=" bg-gray-100 pt-10 h-full sm:min-h-screen lg:min-h-screen sm:px-32 lg:px-40 px-4">
                        <div className="md:flex md:space-x-6 pb-8">
                            <h1 className=" text-2xl font-bold truncate ...">Cart Items</h1>
                        </div>
                        <div className="justify-center lg:flex lg:space-x-6 pb-8">
                            <div className="rounded-lg lg:w-2/3">
                                {hook.cart?.items?.map((cartItem, index) => {
                                    return (
                                        <div key={index} className="mb-6 rounded-lg bg-white p-6 shadow-md lg:flex lg:justify-start">
                                            {cartItem?.ImgId ? (
                                                <img src={hook.imageSrc.getLink(cartItem.ImgId)} className="lg:w-[124px] w-full lg:h-36 h-96 lg:mr-5 mb-7 lg:mb-0 object-cover" />
                                            ) : (
                                                <div className='lg:w-40 w-full lg:h-36 h-96 bg-[#f7f7f7] flex items-center justify-center'>
                                                    <svg className="h-8 w-10 text-[#808080bd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <circle cx="8.5" cy="8.5" r="1.5" />  <polyline points="21 15 16 10 5 21" /></svg>
                                                </div>
                                            )}
                                            <div className="lg:ml-4 lg:flex w-full lg:justify-between">
                                                <div className="mt-5 lg:mt-0 flex flex-col justify-between">
                                                    <h2 className="text-sm font-bold text-gray-900 truncate ... max-w-[250px]">{cartItem.itemName}</h2>
                                                    <p className="text-gray-700">{`₹ ${cartItem.totalAmount}`}</p>
                                                </div>
                                                <div className="mt-4 flex lg:flex-col flex-row justify-between im sm:space-y-6 lg:mt-0 sm:space-x-6">
                                                    <div className="flex items-center border-gray-100">
                                                        <span className="text-[12px] font-medium h-8 flex items-center justify-center rounded-l bg-gray-100 py-1 px-3.5 duration-100"> Qty </span>
                                                        <p className="h-8 w-8 border flex items-center justify-center text-xs text-gray-700">{cartItem.quantity}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-4 justify-end">
                                                        <button onClick={() => hook.handleRemoveFromCart(cartItem.itemId)} type="button">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-gray-500">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex flex-col h-full rounded-lg border bg-white p-6 shadow-md lg:w-1/3">
                                <div className="mb-2 flex justify-between">
                                    <p className="text-gray-700">Subtotal</p>
                                    <p className="text-gray-700">{`₹ ${hook.cart?.subTotal}`}</p>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <div className="">
                                        <p className="mb-1 text-lg font-bold">{`₹ ${hook.cart?.subTotal}`}</p>
                                    </div>
                                </div>
                                <LinkDisplay pageId='checkout'>
                                    {
                                        ({ url }) => (
                                            <Link to={url} className="text-sm mt-6 w-full text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 h-[45px] flex items-center justify-center">
                                                Check out
                                            </Link>
                                        )
                                    }
                                </LinkDisplay>
                                <div className="flex justify-center">
                                    <LinkDisplay pageId='homepage'>
                                        {
                                            ({ url }) => (
                                                <Link to={url} className="flex items-center justify-center mt-6 w-fit rounded-md py-1.5 font-medium text-gray-700 hover:text-gray-500 gap-2">
                                                    <div className="w-3 h-3 border-b-2 border-l-2 transform rotate-45"></div>
                                                    Continue shopping
                                                </Link>
                                            )
                                        }
                                    </LinkDisplay>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center min-h-screen'>
                        <section className="text-center mx-6 lg:w-2/3">
                            <h1 className="mt-2 mb-1 text-2xl lg:text-3xl">There is nothing in your cart .</h1>
                            <div className='mb-5'>
                                <p>
                                    Let's add some items.
                                </p>
                            </div>
                            <LinkDisplay pageId='homepage'>
                                {
                                    ({ url }) => (
                                        <Link to={url} className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
                                            Back to homepage
                                        </Link>
                                    )
                                }
                            </LinkDisplay>
                        </section>
                    </div>
                )}
                <Footer />
            </Protected>
        </>
    )
}