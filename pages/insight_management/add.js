import cookies from 'next-cookies'
import { useState } from 'react'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import Constants from '../../helpers/Constants'

const videoAvailabilities = [
    {
        name: 'Free Members',
        id: 'free'
    },
    {
        name: 'Premium Members',
        id: 'premium'
    }
]

export default function AddInsightManagement({ insightTypes }) {
    const [selectedInsightType, setSelectedInsightType] = useState(insightTypes[0])
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <div>
                <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={4} />


                <div className="md:pl-64 flex flex-col flex-1">
                    <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

                    <main className="flex-1">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                            {/* <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                            </div> */}
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200">
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 self-center">Insight Title</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                id="name"
                                                name="name"
                                                type='text'
                                                className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                            />
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 self-center">Insight Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                id="name"
                                                name="name"
                                                type='text'
                                                className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                            />
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 self-center">Author Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                id="name"
                                                name="name"
                                                type='text'
                                                className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                            />
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 self-center">Tag</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                id="name"
                                                name="name"
                                                type='text'
                                                className="rounded-full bg-gray-100 px-4 py-2 pr-14 text-sm w-full outline-none border focus:border-fgreen-700 duration-500"
                                            />
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Type</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2"
                                            >
                                                {
                                                    insightTypes.map((insightType) => (
                                                        <option>{insightType.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 self-center">Insight File</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex">
                                            <div className="flex text-sm text-gray-600 py-2 px-12 border border-dashed border-gray-300 rounded-full">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    <span>Browse</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or Drag And Drop</p>
                                            </div>
                                            <button
                                                type="button"
                                                className="bg-white ml-4 p-2 border border-gray-300 rounded-full shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-white ml-4 p-2 border border-gray-300 rounded-full shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <svg className="self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" /></svg>
                                            </button>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 self-center">Subtitle File</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex">
                                            <div className="flex text-sm text-gray-600 py-2 px-12 border border-dashed border-gray-300 rounded-full">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    <span>Browse</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or Drag And Drop</p>
                                            </div>
                                            <button
                                                type="button"
                                                className="bg-white ml-4 p-2 border border-gray-300 rounded-full shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-white ml-4 p-2 border border-gray-300 rounded-full shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <svg className="self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" /></svg>
                                            </button>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 self-center">Thumbnail</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex">
                                            <div className="flex text-sm text-gray-600 py-2 px-12 border border-dashed border-gray-300 rounded-full">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    <span>Browse</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or Drag And Drop</p>
                                            </div>
                                            <button
                                                type="button"
                                                className="bg-white ml-4 p-2 border border-gray-300 rounded-full shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <svg className="self-center" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" /></g><g><path d="M7.4,10h1.59v5c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-5h1.59c0.89,0,1.34-1.08,0.71-1.71L12.7,3.7 c-0.39-0.39-1.02-0.39-1.41,0L6.7,8.29C6.07,8.92,6.51,10,7.4,10z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" /></g></svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-white ml-4 p-2 border border-gray-300 rounded-full shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <svg className="self-center" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" /></svg>
                                            </button>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Video Availabilities</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="max-w-lg block  w-full shadow-sm sm:max-w-xs sm:text-sm bg-white border border-gray-300 rounded-full shadow-sm pl-3 pr-10 py-2"
                                            >
                                                {
                                                    videoAvailabilities.map((v) => (
                                                        <option>{v.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 self-center">Video Preview For Non-Subscribers</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex">
                                            <input
                                                id="name"
                                                name="name"
                                                type='text'
                                                className="rounded-full bg-gray-100 px-4 py-2 text-sm w-12 outline-none border focus:border-fgreen-700 duration-500"
                                            />
                                            <div className="self-center pl-2 pr-4 ">
                                                Hours
                                            </div>
                                            <input
                                                id="name"
                                                name="name"
                                                type='text'
                                                className="rounded-full bg-gray-100 px-4 py-2 text-sm w-12 outline-none border focus:border-fgreen-700 duration-500"
                                            />
                                            <div className="self-center pl-2 pr-4 ">
                                                Minutes
                                            </div>
                                            <input
                                                id="name"
                                                name="name"
                                                type='text'
                                                className="rounded-full bg-gray-100 px-4 py-2 text-sm w-12 outline-none border focus:border-fgreen-700 duration-500"
                                            />
                                            <div className="self-center px-2 ">
                                                Seconds
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
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
