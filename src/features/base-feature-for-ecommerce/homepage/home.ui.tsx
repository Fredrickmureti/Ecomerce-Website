import { importUI } from '@magicjs.dev/frontend';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Header = importUI("@mern.ai/standard-header")
const Footer = importUI("@mern.ai/standard-footer")
const Widget = importUI("@mern.ai/catalogue-list-widget")

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="bg-white">
                <Header />
                <div className="min-h-screen relative isolate ">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 h-3/4" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{ clipPath: "clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}>
                        </div>
                    </div>
                    <div className="py-8 lg:py-16 sm:px-32 lg:px-40 px-4">
                        <div className='pt-[50px] lg:pt-[150px]'>
                            <h1 className="text-3xl font-bold tracking-tight text-[#393939] sm:text-6xl">
                                Welcome to my app
                            </h1>
                            <p className="mt-8 text-lg leading-8 text-[#393939] pb-[110px]">Explore our diverse range of offerings tailored to inspire, inform, and <br />
                                elevate your experience</p>
                            <Widget />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}