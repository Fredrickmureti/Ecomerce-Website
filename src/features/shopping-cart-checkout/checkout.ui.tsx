import React from 'react';
import { Link, LinkDisplay, Protected, importUI } from "@magicjs.dev/frontend";
import useCheckoutHook from './checkout.hook';

const Header = importUI("@mern.ai/standard-header")
const Footer = importUI("@mern.ai/standard-footer")

export default function Checkout() {
    const hook: any = useCheckoutHook();

    if (hook.cartLoading) {
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
                    <div className="min-h-screen py-10 bg-white px-4 pb-5 max-w-full sm:px-32 lg:px-40">
                        <div className='flex w-fit gap-5 mb-14 items-center'>
                            <LinkDisplay pageId='cart'>
                                {
                                    ({ url }) => (
                                        <Link to={url}>
                                            <svg className="w-5 h-4 text-gray-800 hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                            </svg>
                                        </Link>
                                    )
                                }
                            </LinkDisplay>
                            <h1 className="font-bold text-1xl">Checkout</h1>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <div className="mb-8">
                                    <label className="mb-5 block text-sm font-semibold text-[#07074D]">
                                        Contact information
                                    </label>
                                    <label htmlFor="email" className="mb-3 block text-sm font-medium text-[#07074D]">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={hook.email}
                                        onChange={(e) => hook.setEmail(e.target.value)}
                                        className="w-full h-9 rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                                <div className="mb-8 mt-2">
                                    <label className="mb-5 block text-sm font-semibold text-[#07074D]">
                                        Shipping address
                                    </label>
                                    <label className="mb-3 block text-sm font-medium text-[#07074D]">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={hook.address}
                                        onChange={(e) => hook.setAddress(e.target.value)}
                                        className="w-full h-9 rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                                <div className="mb-8 mt-2 flex gap-3 justify-center">
                                    <div className="mb-5 mt-2 flex-1">
                                        <label className="mb-3 block text-xs sm:text-sm font-medium text-[#07074D]">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={hook.city}
                                            onChange={(e) => hook.setCity(e.target.value)}
                                            className="w-full h-9 rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                    <div className="mb-5 mt-2 flex-1">
                                        <label className="mb-3 block text-xs sm:text-sm font-medium text-[#07074D]">
                                            State/Province
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            value={hook.state}
                                            onChange={(e) => hook.setState(e.target.value)}
                                            className="w-full h-9 rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                    <div className="mb-5 mt-2 flex-1">
                                        <label className="mb-3 block text-xs sm:text-sm font-medium text-[#07074D]">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            value={hook.postalCode}
                                            onChange={(e) => hook.setPostalCode(e.target.value)}
                                            className="w-full h-9 rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                            </div>
                            <aside className="flex justify-end">
                                <div className="h-fit flex flex-col rounded-lg border bg-white p-6 shadow-md w-full lg:w-[70%]">
                                    <div className="mb-2 flex justify-between">
                                        <p className="text-gray-700">Subtotal</p>
                                        <p className="text-gray-700">₹{hook.cart?.subTotal}</p>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="flex justify-between">
                                        <p className="text-lg font-bold">Total</p>
                                        <div className="">
                                            <p className="mb-1 text-lg font-bold">₹{hook.cart?.subTotal}</p>
                                        </div>
                                    </div>
                                    {hook.showAlert && (
                                        <div className="relative top-0 left-0 w-full bg-green-50 border-b-2 border-green-500 p-4 text-green-600 mt-3">
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
                                                        <p>Order placed Successfully.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        disabled={hook.disabledState}
                                        onClick={() => hook.handlePlaceOrder()}
                                        className="mt-6 w-full text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 disabled:bg-gray-200">
                                        {
                                            hook.loading ? (
                                                <div role="status">
                                                    <svg aria-hidden="true" className="inline w-6 h-3 text-white-200 animate-spin dark:text-white-600 fill-white-600 dark:fill-white-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className='pl-2'>Placing...</span>
                                                </div>
                                            ) : (
                                                "Place Order"
                                            )
                                        }
                                    </button>
                                    <p className='text-[12px] font-medium text-red-600 mt-2'>{hook.err}</p>
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
                            </aside>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center min-h-screen'>
                        <section className="text-center mx-6 lg:w-2/3">
                            <h1 className="mt-2 mb-1 text-2xl lg:text-3xl">There is nothing in your cart .</h1>
                            <div className='mb-5'>
                                <p>
                                    Let's add some items to continue.
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
};

