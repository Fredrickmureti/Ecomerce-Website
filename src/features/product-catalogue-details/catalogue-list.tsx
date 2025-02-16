import React from 'react';
import { Link, LinkDisplay, loadConfig } from "@magicjs.dev/frontend";
import useCatalogueHook from './catalogue-list.hook';
import configJson from './config.json';

const config = loadConfig(configJson);

export default function CatalogueList() {
  const hook = useCatalogueHook();

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
      {hook.items?.length >= 1 && (
        <div className="max-w-3xl py-6 lg:max-w-7xl lg:pt-24 lg:pb-16">
          <h2 className="text-2xl pb-[35px] font-bold tracking-tight text-gray-800 text-[22px]">{config.getValue('label')}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
            {
              hook.items?.map((item, index) => {
                return (
                  <LinkDisplay pageId='catalogueDetails' params={{ itemId: item._id }} key={index}>
                    {
                      (props) =>
                        <Link to={props.url} className='hover:opacity-80'>
                          <div
                            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 group-hover:opacity-75 min-h-[300px]">
                            {item?.ImgId ? (
                              <img src={hook.imageSrc.getLink(item.ImgId)} className="h-96 w-80 lg:mr-5 mb-7 lg:mb-0 object-cover rounded-lg" />
                            ) : (
                              <div className='h-full w-full bg-[#f7f7f7] flex items-center justify-center'>
                                <svg className="h-8 w-10 text-[#808080bd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <circle cx="8.5" cy="8.5" r="1.5" />  <polyline points="21 15 16 10 5 21" /></svg>
                              </div>
                            )}
                          </div>
                          <h3 className="mt-4 text-sm text-gray-700 truncate ...">{item.name}</h3>
                        </Link>
                    }
                  </LinkDisplay>
                )
              })
            }
          </div>
        </div>
      )}
    </>
  )
};

