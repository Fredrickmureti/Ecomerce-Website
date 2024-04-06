import React from 'react';
import { Link, LinkDisplay, importUI } from '@magicjs.dev/frontend';
import useOrderDetailsHook from "./order-details.hook";
import moment from 'moment';

const Header = importUI("@mern.ai/standard-header")
const Footer = importUI("@mern.ai/standard-footer")

export default function OrderDetails() {
    const hook: any = useOrderDetailsHook(); 

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
            <div className="min-h-screen bg-white">
                <div className="mt-10 mb-10 px-4 sm:px-36 flex flex-col xl:flex-col jusitfy-center items-stretch w-full space-y-4 md:space-y-6 xl:space-y-0">
                    <div>
                        <LinkDisplay pageId='orders'>
                            {
                                ({ url }) => (
                                    <Link to={url}>
                                        <svg className="w-5 h-4 text-gray-800 hover:text-gray-500 mb-[15px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                        </svg>
                                    </Link>
                                )
                            }
                        </LinkDisplay>
                    </div>
                    <div className="flex justify-start item-start space-y-2 flex-col">
                        <p className="sm:text-2xl text-lg font-medium leading-6 lg:mt-[20px]">{moment(hook.order.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>
                </div>
                <div className="mt-10 mb-10 px-4 sm:px-36 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="font-semibold leading-6 xl:leading-5 text-gray-800 text-[17px]">Products</p>
                            {hook.order?.items?.map((item, index) => {
                                return (
                                    <div key={index} className="mt-6 flex justify-start sm:flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                                        {item?.ImgId ? (
                                            <div className="w-full h-full md:w-40">
                                                <img className="w-full md:h-[129px] sm:h-96 h-[129px] object-cover" src={hook.imageSrc.getLink(item.ImgId)} />
                                            </div>
                                        ) : (
                                            <div className='w-full md:h-[129px] sm:h-96 h-[129px] md:w-40 bg-[white] flex items-center justify-center'>
                                                <svg className="h-8 w-10 text-[#808080bd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <circle cx="8.5" cy="8.5" r="1.5" />  <polyline points="21 15 16 10 5 21" /></svg>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start w-full sm:flex-row md:flex-row  md:space-y-0 mt-[1px] ml-4 sm:ml-0">
                                            <div className="w-[90%] flex flex-col justify-start items-start space-y-2">
                                                <h3 className="font-semibold w-[100px] lg:w-[300px] leading-6 text-gray-800 text-[14px] truncate ...">{item.itemName}</h3>
                                                <p className="leading-6 text-gray-800 text-[14px]">Qty: {item.quantity}</p>
                                                <p className="leading-6 text-[14px]">Price: {`₹ ${item.price}`}</p>
                                            </div>
                                            <div className="flex justify-end w-full">
                                                <p className="xl:text-lg font-semibold leading-6 text-gray-800 text-[14px] mt-[1px]">{`₹ ${item.totalAmount}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                <h3 className="font-semibold leading-5 text-gray-800 text-[17px]">Summary</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                        <p className="leading-4 text-gray-800 text-[17px]">Subtotal</p>
                                        <p className="leading-4 text-gray-600 text-[17px]">{`₹ ${hook.order.subTotal}`}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="font-semibold leading-4 text-gray-800 text-[16px]">Total</p>
                                    <p className="font-semibold leading-4 text-gray-600 text-[16px]">{`₹ ${hook.order.subTotal}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 h-fit w-full xl:w-96 flex justify-between items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-start">
                                        <div className="flex justify-center justify-start items-start flex-col space-y-4">
                                            <p className="font-semibold leading-4 text-center md:text-left text-gray-800 text-[17px]">Shipping Address</p>
                                            <p className="w-48 lg:w-full xl:w-48 text-left text-sm leading-5 text-gray-600 truncate ...">{hook.order.shippingAddress.address} <br />
                                                {hook.order.shippingAddress.city} <br /> {hook.order.shippingAddress.state} <br /> {hook.order.shippingAddress.postalCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}