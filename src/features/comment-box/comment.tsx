import React, { Fragment } from 'react';
import { Link, LinkDisplay, useLogin } from "@magicjs.dev/frontend";
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import useCommentHook from './comment.hook';
import moment from 'moment';

export default function Comment(props) {
    const hook = useCommentHook(props);
    const { current } = useLogin();

    return (
        <>
            <div className="bg-white py-8 lg:py-16 antialiased">
                <div className="max-w-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Comments</h2>
                    </div>
                    {current.isAuthenticated ? (
                        <form className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                                <label htmlFor="comment" className="sr-only">
                                    Your comment
                                </label>
                                <textarea
                                    id="comment"
                                    rows={3}
                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                    placeholder="Write a comment..."
                                    required
                                    value={hook.comment}
                                    onChange={(e) => hook.setComment(e.target.value)}
                                    autoFocus
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-gray-200"
                                disabled={!hook.comment || hook.isCommentLoading === true}
                                onClick={hook.handleAddComment}
                            >
                                {hook.isCommentLoading === true ? (
                                    "Posting..."
                                ) : (
                                    "Post comment"
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="flex h-20 w-fit items-center justify-center ">
                            <LinkDisplay pageId='login'>
                                {
                                    ({ url }) => (
                                        <Link to={url} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:opacity-80 ">
                                            Sign in to comment
                                        </Link>
                                    )
                                }
                            </LinkDisplay>
                        </div>
                    )}

                    {hook.content.length !== 0 ? (
                        hook.content?.map((comment, index) => {
                            return (
                                <div key={index}>
                                    <article className="text-base bg-white rounded-lg mb-1 pr-0 pt-4 pb-4">
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <div className="inline-flex items-center mr-2 sm:mr-3 text-xs sm:text-sm text-gray-900 font-semibold">
                                                    <div className="relative mr-2 w-6 h-6 overflow-hidden bg-gray-100 rounded-full">
                                                        <svg className="absolute w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                                    </div>
                                                    <p>{comment.userName}</p>
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    <time>
                                                        {moment(comment.createdAt).fromNow()}
                                                    </time>
                                                </p>
                                                <p className="text-xs text-gray-300 pl-2 mr-4 sm:mr-0">
                                                    {comment.edited === true ? (
                                                        "Edited"
                                                    ) : null}
                                                </p>
                                            </div>
                                            {hook.userName === comment.userName ? (
                                                <div className="flex items-center flex-col">
                                                    <button
                                                        id={index}
                                                        data-dropdown-toggle="dropdownComment1"
                                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                                                        type="button"
                                                        onClick={() => { hook.toggleDropdown(comment._id) }}
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 16 3"
                                                        >
                                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                        </svg>
                                                        <span className="sr-only">Comment settings</span>
                                                    </button>
                                                    {hook.isEditCommentDropdownVisible && hook.selectedCommentId === comment._id ? (
                                                        <div
                                                            id="dropdownComment1"
                                                            className=" z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow absolute mt-9 sm:right-auto right-2"
                                                        >
                                                            <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownMenuIconHorizontalButton">
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        className="block py-2 px-4 hover:bg-gray-100"
                                                                        onClick={(event) => { hook.toggleEdit(event, comment._id), hook.setExistingComment(comment.comment) }}
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        className="block py-2 px-4 hover:bg-gray-100"
                                                                        onClick={(event) => { hook.toggleDeleteCommentModal(event, comment._id), hook.setIsEditCommentDropdownVisible(false) }}
                                                                    >
                                                                        Remove
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ) : null}
                                        </footer>
                                        {hook.isCommentEditable === true && hook.selectedCommentId === comment._id ? (
                                            <>
                                                <textarea
                                                    id="comment"
                                                    rows={3}
                                                    className="py-2 px-4 w-full rounded-lg rounded-t-lg text-sm text-gray-900 border border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none"
                                                    placeholder="Write a comment..."
                                                    required
                                                    value={hook.existingComment}
                                                    onChange={(e) => {
                                                        hook.setExistingComment(e.target.value);
                                                    }}
                                                    ref={ref => ref && ref.focus()}
                                                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                                                />
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-gray-200"
                                                        disabled={!hook.existingComment || hook.isEditedCommentLoading === true}
                                                        onClick={hook.handleUpdateComment}
                                                    >
                                                        {hook.isEditedCommentLoading === true ? (
                                                            "Posting..."
                                                        ) : (
                                                            "Post"
                                                        )}
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-white-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-gray-200"
                                                        onClick={() => { hook.setIsCommentEditable(false), hook.setExistingComment("") }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: comment.comment.replace(/\n/g, '<br>') }}></p>
                                        )}
                                        {current.isAuthenticated ? (
                                            <div className="flex items-center mt-4 space-x-4">
                                                <button
                                                    type="button"
                                                    onClick={() => { hook.toggleReply(comment._id) }}
                                                    className="flex items-center text-sm text-gray-500 hover:underline font-medium"
                                                >
                                                    <svg
                                                        className="mr-1.5 w-3.5 h-3.5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 18"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                                        />
                                                    </svg>
                                                    Reply
                                                </button>
                                            </div>
                                        ) : null}
                                    </article>

                                    {hook.replyVisible && hook.selectedCommentId === comment._id ? (
                                        <article className="mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg pr-0 pt-4 pb-4">
                                            <footer className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <div className="inline-flex items-center mr-3 text-xs sm:text-sm text-gray-900 font-semibold">
                                                        <div className="relative mr-2 w-6 h-6 overflow-hidden bg-gray-100 rounded-full">
                                                            <svg className="absolute w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                                        </div>
                                                        {hook.userName}
                                                    </div>
                                                </div>
                                            </footer>
                                            <textarea
                                                id="comment"
                                                rows={3}
                                                className="py-2 px-4 w-full rounded-lg rounded-t-lg border border-gray-200 w-full text-sm text-gray-900 focus:border-gray-300 focus:ring-0 focus:outline-none"
                                                placeholder="Write a comment..."
                                                required
                                                value={hook.subComment}
                                                onChange={(e) => {
                                                    hook.setSubComment(e.target.value);
                                                }}
                                                autoFocus
                                            />
                                            <button
                                                type="submit"
                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-gray-200"
                                                disabled={!hook.subComment || hook.isReplyLoading === true}
                                                onClick={hook.handleAddReply}
                                            >
                                                {hook.isReplyLoading === true ? (
                                                    "Posting..."
                                                ) : (
                                                    "Post"
                                                )}
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-white-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-gray-200"
                                                onClick={() => { hook.setReplyVisible(false), hook.setSubComment(""); }}
                                            >
                                                Cancel
                                            </button>
                                        </article>
                                    ) : null}
                                    {comment.replies.length > 0 ? (
                                        <>
                                            {comment.replies.map((reply, key) => {
                                                return (
                                                    <article key={key} className="mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg pr-0 pt-4 pb-4">
                                                        <footer className="flex justify-between items-center mb-2">
                                                            <div className="flex items-center">
                                                                <div className="inline-flex items-center mr-2 sm:mr-3 text-xs sm:text-sm text-gray-900">
                                                                    <div className="relative mr-2 w-6 h-6 overflow-hidden bg-gray-100 rounded-full">
                                                                        <svg className="absolute w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                                                    </div>
                                                                    {reply.userName}
                                                                </div>
                                                                <p className="text-xs sm:text-sm text-gray-600">
                                                                    <time>
                                                                        {moment(reply.createdAt).fromNow()}
                                                                    </time>
                                                                </p>
                                                                <p className="text-xs mr-4 sm:mr-0 text-gray-300 pl-2">
                                                                    {reply.edited === true ? (
                                                                        "Edited"
                                                                    ) : null}
                                                                </p>
                                                            </div>
                                                            {hook.userName === reply.userName ? (
                                                                <div className="flex relative">
                                                                    <button
                                                                        id="dropdownComment2Button"
                                                                        data-dropdown-toggle="dropdownComment2"
                                                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                                                                        type="button"
                                                                        onClick={() => { hook.toggleReplyDropdown(reply._id) }}
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 16 3"
                                                                        >
                                                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Comment settings</span>
                                                                    </button>
                                                                    {hook.isEditReplyDropdownVisible && hook.selectedReplyId === reply._id ? (
                                                                        <div
                                                                            id="dropdownComment2"
                                                                            className="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow absolute mt-9 -right-8 sm:-right-14"
                                                                        >
                                                                            <ul
                                                                                className="py-1 text-sm text-gray-700"
                                                                                aria-labelledby="dropdownMenuIconHorizontalButton"
                                                                            >
                                                                                <li>
                                                                                    <a
                                                                                        href="#"
                                                                                        className="block py-2 px-4 hover:bg-gray-100"
                                                                                        onClick={(event) => { hook.toggleEditReply(event, reply._id), hook.setExistingComment(reply.comment) }}
                                                                                    >
                                                                                        Edit
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a
                                                                                        href="#"
                                                                                        className="block py-2 px-4 hover:bg-gray-100"
                                                                                        onClick={(event) => { hook.toggleDeleteReplyModal(event, reply._id, comment._id), hook.setIsEditReplyDropdownVisible(false) }}
                                                                                    >
                                                                                        Remove
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            ) : null}
                                                        </footer>
                                                        {hook.isReplyEditable === true && hook.selectedReplyId === reply._id ? (
                                                            <>
                                                                <textarea
                                                                    id="comment"
                                                                    rows={3}
                                                                    className="py-2 px-4 w-full rounded-lg rounded-t-lg border border-gray-200 w-full text-sm text-gray-900 focus:border-gray-300 focus:ring-0 focus:outline-none"
                                                                    placeholder="Write a comment..."
                                                                    required
                                                                    value={hook.existingComment}
                                                                    onChange={(e) => {
                                                                        hook.setExistingComment(e.target.value);
                                                                    }}
                                                                    ref={ref => ref && ref.focus()}
                                                                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                                                                />
                                                                <div>
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-gray-200"
                                                                        disabled={!hook.existingComment || hook.isEditedReplyLoading === true}
                                                                        onClick={() => { hook.handleUpdateReply(reply._id, comment._id) }}
                                                                    >
                                                                        {hook.isEditedReplyLoading === true ? (
                                                                            "Posting..."
                                                                        ) : (
                                                                            "Post"
                                                                        )}
                                                                    </button>
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-white-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-gray-200"
                                                                        onClick={() => { hook.setIsReplyEditable(false), hook.setExistingComment("") }}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: reply.comment.replace(/\n/g, '<br>') }}></p>
                                                        )}
                                                    </article>
                                                );
                                            })}
                                        </>
                                    ) : null}
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex items-center mt-14">
                            <p className="flex w-full justify-center text-sm text-gray-600">
                                No comments yet!
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Transition.Root show={hook.isDeleteCommentModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={hook.cancelButtonRef} onClose={hook.setIsDeleteCommentModalOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Remove Comment
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to remove this comment ?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={(event) => hook.handleDeleteComment(event)}
                                        >
                                            {hook.isCommentDeleting === true ? (
                                                "Removing..."
                                            ) : (
                                                "Remove"
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => hook.setIsDeleteCommentModalOpen(false)}
                                            ref={hook.cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={hook.isDeleteReplyModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={hook.cancelButtonRef} onClose={hook.setIsDeleteReplyModalOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Remove Reply
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to remove this reply ?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={(event) => hook.handleDeleteReply(event)}
                                        >
                                            {hook.isReplyDeleting === true ? (
                                                "Removing..."
                                            ) : (
                                                "Remove"
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => hook.setIsDeleteReplyModalOpen(false)}
                                            ref={hook.cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
};