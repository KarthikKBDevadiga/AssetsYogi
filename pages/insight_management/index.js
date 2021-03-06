import cookies from 'next-cookies'
import moment from 'moment'
import { useState } from 'react'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import Constants from '../../helpers/Constants'
import MetaLayout from '../../components/ MetaLayout'

import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { XIcon } from '@heroicons/react/outline'
import LoadingDialog from '../../components/LoadingDialog'
import { useRouter } from 'next/dist/client/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function InsightManagementList({ data, insightTypes, token }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [unpublishDialog, setUnpublishDialog] = useState(false)
    const [publishDialog, setPublishDialog] = useState(false)
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [selectedInsightId, setSelectedInsightId] = useState(-1)

    const router = useRouter()

    const deleteInsight = () => {
        setDeleteDialog(false)
        setLoadingDialog(true)

        const fetch = require("node-fetch")

        var myHeaders = new Headers()
        myHeaders.append("accesstoken", token)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(Constants.BASE_URL + "api/admin/delete_insight?id=" + selectedInsightId, requestOptions)
            .then(res => res.json())
            .then(
                json => {
                    setLoadingDialog(false)
                    console.log(json)
                    if (json.code == 200) {
                        // router.back()
                        router.reload(window.location.pathname)
                    }
                }
            )
            .catch(err => {
                console.log('erro')
                setLoadingDialog(false)
                console.log(err)
            })
    }
    const unpublishInsight = () => {
        setUnpublishDialog(false)
        setLoadingDialog(true)

        const fetch = require("node-fetch")

        var myHeaders = new Headers()
        myHeaders.append("accesstoken", token)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(Constants.BASE_URL + "api/admin/action_insight?status=unpublished&id=" + selectedInsightId, requestOptions)
            .then(res => res.json())
            .then(
                json => {
                    setLoadingDialog(false)
                    console.log(json)
                    if (json.code == 200) {
                        // router.back()
                        router.reload(window.location.pathname)
                    }
                }
            )
            .catch(err => {
                console.log('erro')
                setLoadingDialog(false)
                console.log(err)
            })
    }
    const publishInsight = () => {
        setPublishDialog(false)
        setLoadingDialog(true)

        const fetch = require("node-fetch")

        var myHeaders = new Headers()
        myHeaders.append("accesstoken", token)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(Constants.BASE_URL + "api/admin/action_insight?status=published&id=" + selectedInsightId, requestOptions)
            .then(res => res.json())
            .then(
                json => {
                    setLoadingDialog(false)
                    console.log(json)
                    if (json.code == 200) {
                        // router.back()
                        router.reload(window.location.pathname)
                    }
                }
            )
            .catch(err => {
                console.log('erro')
                setLoadingDialog(false)
                console.log(err)
            })
    }
    return (
        <>
            <MetaLayout />
            <div className='font-raleway'>
                <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={4} />
                <div className="md:pl-64 flex flex-col flex-1">
                    <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

                    <main className="flex-1">
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                                <div className="ml-4 mt-2">
                                    <div className="mt-1 flex">
                                        <div className="relative flex items-stretch">
                                            <input
                                                type="text"
                                                name="search"
                                                id="search"
                                                className="block w-full rounded-md rounded-md pl-4 sm:text-sm border border-gray-900"
                                                placeholder="Search Insights Here"
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="relative inline-flex items-center space-x-2 ml-4 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                                        >
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-4 mt-2 flex-shrink-0">
                                    <a
                                        href='insight_management/add'
                                        type="button"
                                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-bluecolor"
                                    >
                                        Add New Insight
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col">
                                <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            S. No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Insight Title
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Tag
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Published On
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Insight Type
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Status
                                                        </th>
                                                        <th scope="col" className="relative px-2 py-3">
                                                            <span className="sr-only">Action</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                                    {
                                                        data.filter(i => i.insight_title.toLowerCase().includes(searchText.toLowerCase())).map((d, i) => {
                                                            const publishedOnString = moment(d.created_at).format('DD MMM YYYY');
                                                            return (
                                                                <tr key={i}>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        {i + 1}
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        {d.insight_title}
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        Tags
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        {publishedOnString}
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        {insightTypes.find(i => i.id == d.type)?.name}
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        {d.status}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <Menu as="div" className="relative inline-block text-left">
                                                                            <div>
                                                                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-black shadow-sm px-4 py-2 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50">
                                                                                    Action
                                                                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                                                                </Menu.Button>
                                                                            </div>

                                                                            <Transition
                                                                                as={Fragment}
                                                                                enter="transition ease-out duration-100"
                                                                                enterFrom="transform opacity-0 scale-95"
                                                                                enterTo="transform opacity-100 scale-100"
                                                                                leave="transition ease-in duration-75"
                                                                                leaveFrom="transform opacity-100 scale-100"
                                                                                leaveTo="transform opacity-0 scale-95"
                                                                            >
                                                                                <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-yellow-300 ring-1 ring-black ring-opacity-5 focus:outline-none border border-black">
                                                                                    <div>
                                                                                        <Menu.Item>
                                                                                            {({ active }) => (
                                                                                                <a
                                                                                                    href="#"
                                                                                                    className={classNames(
                                                                                                        active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                                                                                        'block px-4 py-2 text-sm text-center duration-500 rounded-t-md font-bold'
                                                                                                    )}
                                                                                                >
                                                                                                    View
                                                                                                </a>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                        <div className='w-full h-px bg-black'></div>
                                                                                        <Menu.Item>
                                                                                            {({ active }) => (
                                                                                                <a
                                                                                                    href={"/insight_management/" + d.insight_id + '/update'}
                                                                                                    className={classNames(
                                                                                                        active ? 'hover:bg-yellow-400 text-gray-900' : 'text-gray-700',
                                                                                                        'block px-4 py-2 text-sm text-center duration-500 font-bold'
                                                                                                    )}
                                                                                                >
                                                                                                    Edit
                                                                                                </a>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                        <div className='w-full h-px bg-black'></div>
                                                                                        <Menu.Item>
                                                                                            {({ active }) => (
                                                                                                <div
                                                                                                    // href="#"
                                                                                                    onClick={() => {
                                                                                                        setSelectedInsightId(d.insight_id)
                                                                                                        setDeleteDialog(true)
                                                                                                    }}
                                                                                                    className={classNames(
                                                                                                        active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                                                                                        'block px-4 py-2 text-sm text-center duration-500 font-bold cursor-pointer'
                                                                                                    )}
                                                                                                >
                                                                                                    Delete
                                                                                                </div>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                        <div className='w-full h-px bg-black'></div>
                                                                                        <Menu.Item>
                                                                                            {({ active }) => (
                                                                                                <div
                                                                                                    onClick={() => {
                                                                                                        setSelectedInsightId(d.insight_id)
                                                                                                        d.status == 'published' ?
                                                                                                            setUnpublishDialog(true) :
                                                                                                            setPublishDialog(true)
                                                                                                    }}
                                                                                                    className={classNames(
                                                                                                        active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                                                                                        'block px-4 py-2 text-sm text-center duration-500 rounded-b-md font-bold cursor-pointer'
                                                                                                    )}
                                                                                                >
                                                                                                    {d.status == 'published' ? 'Unpublish' : 'Publish'}
                                                                                                </div>
                                                                                            )}
                                                                                        </Menu.Item>

                                                                                    </div>
                                                                                </Menu.Items>
                                                                            </Transition>
                                                                        </Menu>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Transition.Root show={deleteDialog} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setDeleteDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                                        onClick={() => setDeleteDialog(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Delete Insight
                                        </Dialog.Title>
                                        <div className='mt-4 h-px w-full bg-black'></div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure, you want to delete this insight?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-8 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => deleteInsight()}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={() => setDeleteDialog(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>


            <Transition.Root show={unpublishDialog} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setUnpublishDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                                        onClick={() => setUnpublishDialog(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Unpublish Insight
                                        </Dialog.Title>
                                        <div className='mt-4 h-px w-full bg-black'></div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure, you want to unpublish this insight?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-8 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => unpublishInsight()}
                                    >
                                        Unpublish
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={() => setUnpublishDialog(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={publishDialog} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setPublishDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                                        onClick={() => setUnpublishDialog(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Publish Insight
                                        </Dialog.Title>
                                        <div className='mt-4 h-px w-full bg-black'></div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure, you want to publish this insight?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-8 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => publishInsight()}
                                    >
                                        Publish
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={() => setPublishDialog(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

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
    console.log(token)

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

    const data = await fetch(Constants.BASE_URL + "api/admin/insight_list", {
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
    console.log(data)
    return {
        props: {
            data, insightTypes, token
        },
    };
}
