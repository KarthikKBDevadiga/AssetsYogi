import cookies from 'next-cookies'
import moment from 'moment'
import { useState } from 'react'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import Constants from '../../helpers/Constants'


export default function InsightManagementList({ data, insightTypes }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div>
                <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={4} />
                <div className="md:pl-64 flex flex-col flex-1">
                    <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

                    <main className="flex-1">
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
                                                        data.map((d, i) => {
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
