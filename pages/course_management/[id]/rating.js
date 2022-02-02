import cookies from 'next-cookies'
import moment from 'moment'
import { useState } from 'react'
import NavigationLayout from '../../../components/NavigationLayout'
import HeaderLayout from '../../../components/HeaderLayout'
import Constants from '../../../helpers/Constants'
import MetaLayout from '../../../components/ MetaLayout'

import { Fragment } from 'react'
import { Dialog, Menu, Transition, Switch } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import LoadingDialog from '../../../components/LoadingDialog'
import { XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CourseManagementList({ data, courseId, token }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [unpublishDialog, setUnpublishDialog] = useState(false)
  const [publishDialog, setPublishDialog] = useState(false)
  const [loadingDialog, setLoadingDialog] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState(-1)
  const [searchText, setSearchText] = useState('')

  const router = useRouter()
  const [enabled, setEnabled] = useState(data.ratingstatus.allow_rating == 0 ? true : false)

  const updateStatus = (status) => {
    setEnabled(status)
    setLoadingDialog(true)

    const fetch = require("node-fetch")

    const body = {
      "status": status ? 0 : 1,
      "course_id": courseId
    }

    fetch(Constants.BASE_URL + "api/admin/change_rating_status", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "accesstoken": token
      }
    })
      .then(res => res.json())
      .then(
        json => {
          setLoadingDialog(false)
          if (json.code == 200) {
            router.reload(window.location.pathname)
          }
        }
      )
      .catch(err => {
        setLoadingDialog(false)
        console.log(err)
      })
  }
  return (
    <>
      <MetaLayout />
      <div className='font-raleway'>
        <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={3} />
        <div className="md:pl-64 flex flex-col flex-1">
          <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

          <main className="flex-1">
            <div className="bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-2 text-xl">
                  Send the course name in the same request
                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                  <Switch.Group as="div" className="flex items-center justify-between">
                    <span className="flex-grow flex flex-col">
                      <Switch.Label as="span" className="text-xl font-medium text-gray-900 mr-4" passive>
                        Disable Rating for users
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={updateStatus}
                      className={classNames(
                        enabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                </div>
              </div>
            </div>
            <div className="px-4  ">
              <div className="flex flex-col">
                <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                      <li key='total' className="col-span-1 bg-white rounded-lg border border-black divide-y divide-gray-200">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-tcolor text-xl font-medium truncate align-center ml-auto mr-auto">Total Rating</h3>

                            </div>
                            <p className="mt-1 text-gray-500 text-2xl font-bold truncate text-center">{data.totalrating}</p>
                          </div>
                        </div>
                      </li>
                      <li key='average' className="col-span-1 bg-white rounded-lg border border-black divide-y divide-gray-200">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-tcolor text-xl font-medium truncate align-center ml-auto mr-auto">Average Rating</h3>

                            </div>
                            <p className="mt-1 text-gray-500 text-2xl font-bold truncate text-center">{data.averagerating}</p>
                          </div>
                        </div>
                      </li>
                      <li key='highest' className="col-span-1 bg-white rounded-lg border border-black divide-y divide-gray-200">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-tcolor text-xl font-medium truncate align-center ml-auto mr-auto">Highest Rating</h3>

                            </div>
                            <p className="mt-1 text-gray-500 text-2xl font-bold truncate text-center">{data.highestrating}</p>
                          </div>
                        </div>
                      </li>
                      <li key='lowest' className="col-span-1 bg-white rounded-lg border border-black divide-y divide-gray-200">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-tcolor text-xl font-medium truncate align-center ml-auto mr-auto">Lowest Rating</h3>

                            </div>
                            <p className="mt-1 text-gray-500 text-2xl font-bold truncate text-center">{data.lowestrating}</p>
                          </div>
                        </div>
                      </li>

                    </ul>
                    <div className=" border-b border-gray-200 sm:rounded-lg mt-4">
                      <table className="min-w-full divide-y divide-gray-900">
                        <thead className="">
                          <tr>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left font-bold uppercase tracking-wider text-center"
                            >
                              S. No
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left font-bold uppercase tracking-wider text-center"
                            >
                              User Name
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left font-bold uppercase tracking-wider text-center"
                            >
                              Rating
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left  font-bold uppercase tracking-wider text-center"
                            >
                              User Since
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300 text-sm">
                          {
                            data.ratings.map((r, i) => {
                              return <tr key={r.id}>
                                <td className="p-2 whitespace-nowrap text-center">
                                  {i + 1}
                                </td>
                                <td className="p-2 whitespace-nowrap text-center">
                                  {r.user_name}
                                </td>
                                <td className="p-2 whitespace-nowrap text-center">
                                  {r.ratings}
                                </td>
                                <td className="p-2 whitespace-nowrap text-center">
                                  {moment(r.created_at).format('DD MMM YYYY')}
                                </td>
                              </tr>
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

      <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />
    </>
  )
}
export async function getServerSideProps(context) {
  const { token } = cookies(context)
  const courseId = context.params.id

  if (token == null || token == '') {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }

  const fetch = require("node-fetch")

  const body = {
    "status": 1,
    "course_id": courseId
  }
  const data = await fetch(Constants.BASE_URL + "api/admin/get_course_rating", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "accesstoken": token
    }
  })
    .then(res => res.json())
    .then(json => json)
    .catch(err => {
      console.log(err)
    })
  console.log(data)
  return {
    props: {
      data, courseId, token
    },
  };
}
