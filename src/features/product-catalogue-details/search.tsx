import React from 'react';
import useSearchHook from './search.hook';

export default function Search() {
  const hook = useSearchHook();

  return (
    <>
      <div className='my-4 ml-[10px] lg:ml-[0px]'>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <svg className="w-4 h-4 text-gray-500 lg:hidden mr-[10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
          onClick={() => {
            hook.openModal();
          }}>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        {hook.isModalOpen && (
          <div className="fixed z-10 top-16 inset-x-0 overflow-y-auto">
            <div className="flex items-baseline justify-center min-h-screen px-4  text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" onClick={hook.closeModal}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              {/* search Modal  */}
              <div className="inline-block w-full align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <input
                    className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 h-[43px] lg:hidden"
                    value={hook.keywordInput}
                    onChange={(e) => hook.setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && hook.keywordInput.trim() !== '') {
                        window.location.href = `/items/results/${encodeURIComponent(hook.keywordInput)}`;
                      }
                    }}
                    type="search"
                    id="default-search"
                    placeholder="Search Products..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none hidden lg:flex">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            value={hook.keywordInput}
            onChange={(e) => hook.setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && hook.keywordInput.trim() !== '') {
                window.location.href = `/items/results/${encodeURIComponent(hook.keywordInput)}`;
              }
            }}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 lg:min-w-[280px] h-[43px] hidden lg:flex"
            placeholder="Search Products..."
            required
            style={{ WebkitAppearance: 'none' }}
          />
        </div>
      </div>
    </>
  )
};


