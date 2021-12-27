import cookies from 'next-cookies'
import moment from 'moment'
import { useState } from 'react'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import Constants from '../../helpers/Constants'
import MetaLayout from '../../components/ MetaLayout'


export default function InsightManagementList({ data, insightTypes }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <MetaLayout/>
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
                                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                                                                        {insightTypes.find(i => i.id == d.type).name}
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        {d.status}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                            Edit
                                                                        </a>
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
            data, insightTypes
        },
    };
}
