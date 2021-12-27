import cookies from 'next-cookies'
import { useState, useEffect } from 'react'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import Constants from '../../helpers/Constants'

// import Editor from '../../components/Editor'

var Editor = dynamic(() => import("../../components/Editor"), {
    ssr: false
})

export default function AddCourseManagement({ insightTypes }) {
    const [selectedInsightType, setSelectedInsightType] = useState(insightTypes[0])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={4} />

                <div className="md:pl-64 flex flex-col flex-1">
                    <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

                    <main className="flex-1">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 m-4">
                            {/* <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                            </div> */}

                            <div className="px-4 py-5 sm:p-0">
                                <div className="mt-6 grid grid-cols-12 gap-4">
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Course Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-full bg-gray-100 px-4 py-2 pr-4 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Creator Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Language</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <select
                                                    id="language"
                                                    name="language"
                                                    className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2"
                                                >
                                                    <option>English</option>
                                                    <option>Hindi</option>
                                                </select>
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Subtitle Language</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <select
                                                    id="language"
                                                    name="language"
                                                    className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2"
                                                >
                                                    <option>English</option>
                                                    <option>Hindi</option>
                                                </select>
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Course Purchase Cancellation Time</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <select
                                                    id="language"
                                                    name="language"
                                                    className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2"
                                                >
                                                    <option>8 hours</option>
                                                    <option>6 hours</option>
                                                </select>
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Label</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Price for Subscriber (₹)</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Price for Non Subscriber (₹)</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Course Validity</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <div className="grid grid-cols-4 gap-4">
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        <input
                                                            id="name"
                                                            name="name"
                                                            type='text'
                                                            className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                        />
                                                    </dd>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        <select
                                                            id="language"
                                                            name="language"
                                                            className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2"
                                                        >
                                                            <option>Days</option>
                                                            <option>Month</option>
                                                        </select>
                                                    </dd>
                                                </div>
                                            </dd>

                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Course Preview</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <div className="grid grid-cols-4 gap-4">
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        <select
                                                            id="language"
                                                            name="language"
                                                            className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2"
                                                        >
                                                            <option>Video</option>
                                                            <option>Image</option>
                                                        </select>
                                                    </dd>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                                        <button
                                                            type="button"
                                                            className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                                                        >
                                                            <span>Browse</span>
                                                        </button>
                                                    </dd>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                                                        <button
                                                            type="button"
                                                            className="bg-white ml-2  shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
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
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Similar Courses</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <select
                                                    id="language"
                                                    name="language"
                                                    className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2"
                                                >
                                                    <option>8 hours</option>
                                                    <option>6 hours</option>
                                                </select>
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500 self-center text-right">Course Preview</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <div className="grid grid-cols-4 gap-4">

                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                        <button
                                                            type="button"
                                                            className="w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                                                        >
                                                            <span>Browse</span>
                                                        </button>
                                                    </dd>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                                                        <button
                                                            type="button"
                                                            className="bg-white ml-2  shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
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
                                            <dt className="text-sm font-medium text-gray-500 self-top text-right col-span-2 sm:col-span-2">Course Summary</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                                                <textarea
                                                    id="name"
                                                    name="name"
                                                    type='text'
                                                    className="rounded-r-full rounded-bl-full bg-gray-100 px-4 py-2 pr-4 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                                />
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                            Course Summary
                                        </label>
                                        <input
                                            type="text"
                                            name="url"
                                            id="url"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                        />
                                    </div>
                                    <Editor />

                                </div>
                            </div>
                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div >
            </div >
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
