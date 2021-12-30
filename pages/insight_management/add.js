import cookies from 'next-cookies'
import { useState, useEffect } from 'react'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import Constants from '../../helpers/Constants'

import dynamic from 'next/dynamic'
import MetaLayout from '../../components/ MetaLayout'
import LoadingDialog from '../../components/LoadingDialog'

var Editor = dynamic(() => import("../../components/Editor"), {
    ssr: false
})

export default function AddInsightManagement({ insightTypes }) {

    const [selectedInsightType, setSelectedInsightType] = useState(insightTypes[0])
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [type, setType] = useState(0);
    const [onClickType, setOnClickType] = useState(0);
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [authorName, setAuthorName] = useState();
    const [tags, setTags] = useState();
    const [link, setLink] = useState();


    const add = () => {
        setLoadingDialog(true)
        const fetch = require("node-fetch")
        const formData = new FormData();
        formData.append('insight_title', title);
        formData.append('insight_desc', description);
        formData.append('author_name', authorName);
        formData.append('tags', tags);
        formData.append('type', 1);
        formData.append('video_availablity', 'free');
        formData.append('insight_type', 1);
        formData.append('on_click', onClickType);
        formData.append('insight_type', 1);
        formData.append('video_url', link);
    }

    return (
        <>
            <MetaLayout />
            <div className='font-raleway'>
                <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={3} />

                <div className="md:pl-64 flex flex-col flex-1">
                    <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

                    <main className="flex-1">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 m-4">

                            <div className="px-4 py-5 sm:p-0">
                                <div className="mt-6 grid grid-cols-12 gap-4">
                                    <div className="col-span-12 sm:col-span-12">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-bold text-gray-500 self-top text-right col-span-2 sm:col-span-2 self-center">Insight Title</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                                                <input
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    placeholder="Weekly insights for NSE Closing Bell by Aman"
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-md px-4 py-2 pr-4 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-12">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-bold text-gray-500 self-top text-right col-span-2 sm:col-span-2 self-center">Insight Desc:</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                                                <input
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    placeholder="description about the insight"
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-md px-4 py-2 pr-4 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-bold text-gray-500 self-center text-right">Author Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    onChange={(e) => setAuthorName(e.target.value)}
                                                    placeholder='Aman Verma'
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-md px-4 py-2 pr-4 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-bold text-gray-500 self-center text-right">Tag</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    onChange={(e) => setTags(e.target.value)}
                                                    placeholder='Mutual funds'
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-md px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-12">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-bold text-gray-500 self-top text-right col-span-2 sm:col-span-2 self-center">Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                                                <select
                                                    onChange={(e) => setType(e.target.value)}
                                                    id="type"
                                                    name="type"
                                                    className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2"
                                                >
                                                    <option value="0">Post</option>
                                                    <option value="1">Advertisement</option>
                                                </select>
                                            </dd>
                                        </div>
                                    </div>
                                    {
                                        type == 0 ?
                                            <>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-bold text-gray-500 self-center text-right">Insight File:</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <div className="grid grid-cols-4 gap-4">

                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                                    <div className="flex text-sm text-gray-600">
                                                                        <label htmlFor="insight-file-upload" className=" w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100">
                                                                            <span>Browse</span>
                                                                            <input id="insight-file-upload" name="file-upload" type="file" className="sr-only" />
                                                                        </label>
                                                                    </div>
                                                                </dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2  shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" /></svg>
                                                                    </button>
                                                                </dd>
                                                            </div>
                                                        </dd>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-bold text-gray-500 self-center text-right">Subtitle File</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <div className="grid grid-cols-4 gap-4">

                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                                    <div className="flex text-sm text-gray-600">
                                                                        <label htmlFor="subtitle-file-upload" className=" w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100">
                                                                            <span>SRT File</span>
                                                                            <input id="subtitle-file-upload" name="file-upload" type="file" className="sr-only" />
                                                                        </label>
                                                                    </div>
                                                                </dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2  shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" /></svg>
                                                                    </button>
                                                                </dd>
                                                            </div>
                                                        </dd>

                                                    </div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-bold text-gray-500 self-center text-right">Video preview for non-subscribers</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <div className="grid grid-cols-3 gap-4">

                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex gap-2">
                                                                    <input
                                                                        placeholder="00"
                                                                        id="name"
                                                                        name="name"
                                                                        type='text'
                                                                        className="rounded-md px-4 py-2 pr-4 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                                    />
                                                                    <div className='self-center'>hrs</div>
                                                                </dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex gap-2">
                                                                    <input
                                                                        placeholder="00"
                                                                        id="name"
                                                                        name="name"
                                                                        type='text'
                                                                        className="rounded-md px-4 py-2 pr-4 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                                    />
                                                                    <div className='self-center'>min</div>
                                                                </dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex gap-2">
                                                                    <input
                                                                        placeholder="00"
                                                                        id="name"
                                                                        name="name"
                                                                        type='text'
                                                                        className="rounded-md px-4 py-2 pr-4 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                                    />
                                                                    <div className='self-center'>sec</div>
                                                                </dd>
                                                            </div>
                                                        </dd>

                                                    </div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-bold text-gray-500 self-center text-right">Thumbnail</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <div className="grid grid-cols-4 gap-4">

                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                                    <div className="flex text-sm text-gray-600">
                                                                        <label htmlFor="thumbnail-file-upload" className=" w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100">
                                                                            <span>Browse</span>
                                                                            <input id="thumbnail-file-upload" name="file-upload" type="file" className="sr-only" />
                                                                        </label>
                                                                    </div>
                                                                </dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2  shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" /></svg>
                                                                    </button>
                                                                </dd>
                                                            </div>
                                                        </dd>

                                                    </div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-12">
                                                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-bold text-gray-500 self-top text-right col-span-2 sm:col-span-2 self-center">Video Availability</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                                                            <select
                                                                id="country"
                                                                name="country"
                                                                autoComplete="country-name"
                                                                className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2"
                                                            >
                                                                <option>Free Members</option>
                                                                <option>Premium Members</option>
                                                            </select>
                                                        </dd>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-bold text-gray-500 self-center text-right">Adv. File:</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <div className="grid grid-cols-4 gap-4">

                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                                    <div className="flex text-sm text-gray-600">
                                                                        <label htmlFor="adv-file-upload" className=" w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100">
                                                                            <span>Browse</span>
                                                                            <input id="adv-file-upload" name="file-upload" type="file" className="sr-only" />
                                                                        </label>
                                                                    </div>
                                                                </dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2  shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" /></svg>
                                                                    </button>
                                                                </dd>
                                                            </div>
                                                        </dd>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-bold text-gray-500 self-center text-right">Thumbnail:</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <div className="grid grid-cols-4 gap-4">

                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                                    <div className="flex text-sm text-gray-600">
                                                                        <label htmlFor="srt-file-upload" className=" w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100">
                                                                            <span>SRT File</span>
                                                                            <input id="srt-file-upload" name="file-upload" type="file" className="sr-only" />
                                                                        </label>
                                                                    </div>

                                                                </dd>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2  shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white ml-2 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <svg className="self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" /></svg>
                                                                    </button>
                                                                </dd>
                                                            </div>
                                                        </dd>

                                                    </div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-bold text-gray-500 self-center text-right">On click:</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <select
                                                                onChange={(e) => setOnClickType(e.target.value)}
                                                                id="type"
                                                                name="type"
                                                                className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2"
                                                            >
                                                                <option value="0">redirect</option>
                                                                <option value="1">do nothing</option>
                                                            </select>
                                                        </dd>

                                                    </div>
                                                </div>
                                                {
                                                    onClickType == 0 ?
                                                        <div className="col-span-12 sm:col-span-6">
                                                            <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                                    <input
                                                                        onChange={(e) => setLink(e.target.value)}
                                                                        placeholder='https://newcourse/4t45dfdfd'
                                                                        id="name"
                                                                        name="name"
                                                                        type='text'
                                                                        className="rounded-md px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                                    />
                                                                </dd>

                                                            </div>
                                                        </div> : <></>
                                                }


                                            </>
                                    }

                                </div>
                            </div>
                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <a
                                        type="button"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </a>
                                    <a
                                        onClick={
                                            e => add()
                                        }
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Add
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                </div >
            </div >
            <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />
        </>
    )
}
export async function getServerSideProps(context) {
    const { token } = cookies(context)
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const fetch = require("node-fetch")
    const insightTypes = await fetch(Constants.BASE_URL + 'api/admin/insight_types', {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "accesstoken": token
        }
    })
        .then(res => res.json())
        .then(json => json.result)
        .catch(err => {
            console.log(err)
        })
    return {
        props: {
            insightTypes
        },
    };
}
