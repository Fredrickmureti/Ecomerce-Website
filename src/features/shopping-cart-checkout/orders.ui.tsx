import React from 'react';
import { Link, LinkDisplay, Protected, importUI } from "@magicjs.dev/frontend";
import useOrderHook from "./orders.hook";
import { Table } from 'antd';
import moment from 'moment';

const Header = importUI("@mern.ai/standard-header")
const Footer = importUI("@mern.ai/standard-footer")

export default function Orders() {
    const hook: any = useOrderHook();

    const columns: any = [
        {
            title: 'Sl No',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            render: (text, record, index) => index + 1,
            width: 112,
            responsive: ['lg'],
        },
        {
            title: 'Order',
            dataIndex: '',
            render: (_, data, index) => {
                return (
                    <>
                        <LinkDisplay pageId='orderDetails' params={{ orderId: data._id }} key={index}>
                            {
                                (props) =>
                                    <Link to={props.url}>
                                        <div className="h-8 gap-3 items-center inline-block max-w-30 truncate flex flex-wrap overflow-hidden ...">
                                            <p className="font-normal text-xs text-[#1677ff]">
                                                {moment(data.createdAt).format('lll')}
                                            </p>
                                        </div>
                                    </Link>
                            }
                        </LinkDisplay>
                    </>
                )
            },
        }
    ];

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
                <div className='sm:px-32 bg-white lg:px-40 px-4'>
                    <h1 className=" text-2xl font-bold flex w-full py-10">My Orders</h1>
                    <div className="min-h-screen flex justify-center w-full pb-10">
                        <Table
                            className="w-full"
                            size="small"
                            rowKey={(item) => item._id}
                            columns={columns}
                            dataSource={hook.orders}
                        />
                    </div>
                </div>
                <Footer />
            </Protected>
        </>
    )
};