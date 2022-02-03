import cookies from 'next-cookies'
import moment from 'moment'
import { useState } from 'react'
import NavigationLayout from '../../../components/NavigationLayout'
import HeaderLayout from '../../../components/HeaderLayout'
import Constants from '../../../helpers/Constants'
import MetaLayout from '../../../components/ MetaLayout'

import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { XIcon } from '@heroicons/react/outline'
import LoadingDialog from '../../../components/LoadingDialog'
import { useRouter } from 'next/dist/client/router'
import { data } from 'autoprefixer'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ResourcesList({ courseId, resources, token, sections }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [loadingDialog, setLoadingDialog] = useState(false)
  const [addDialog, setAddDialog] = useState(false)
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [chaptersArray, setChaptersArray] = useState(sections[0].chapters_array)
  const [selectedInsightId, setSelectedInsightId] = useState(-1)
  const [file, setFile] = useState()
  const [resourceName, setResourceName] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(chaptersArray[0]);

  const [selectedResource, setSelectedResource] = useState()


  const router = useRouter()

  const readFile = (event, set) => {

    const fileList = event.target.files;
    if (fileList != null && fileList.length == 1) {
      set(fileList[0])
    }
  }

  const addResource = () => {
    console.log(resourceName)
    console.log(selectedSection)
    console.log(selectedChapter)
    console.log(file.name)
    setAddDialog(false)
    setLoadingDialog(true)

    const fetch = require("node-fetch")

    var myHeaders = new Headers()
    myHeaders.append("accesstoken", token)

    var formdata = new FormData();
    formdata.append("course_id", courseId);
    formdata.append("section_id", selectedSection.section_id);
    formdata.append("chapter_id", selectedChapter.chapter_id);
    formdata.append("resource_title", resourceName);

    if (file != null)
      formdata.append('file', file, file.name)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    setResourceName('')
    setFile(null)
    fetch(Constants.BASE_URL + "api/admin/add_course_resourse", requestOptions)
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

  const deleteResource = async () => {
    setDeleteDialog(false)
    setLoadingDialog(true)

    const fetch = require("node-fetch")
    const body = {
      "resource_id": selectedResource.resource_id
    }
    console.log(body)
    await fetch(Constants.BASE_URL + "api/admin/delete_course_resourse", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "accesstoken": token, "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(
        json => {
          setLoadingDialog(false)
          console.log(json)
          if (json.code == 200) {
            // router.back()
            // router.reload(window.location.pathname)

          }
        }
      )
      .catch(err => {
        return 'Error'
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

                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                  <div
                    onClick={() => {
                      setAddDialog(true)
                    }}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-bluecolor"
                  >
                    Add Resources
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-col">
                <div className="my-2  sm:-mx-6 lg:-mx-8">
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
                              Resource Title
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Section
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Lecture
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Uploaded On
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Uploaded By
                            </th>
                            <th scope="col" className="relative px-2 py-3">
                              <span className="sr-only">Action</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                          {
                            resources.map((r, i) => {
                              // const createdAtString = moment(r.created_at).format('DD MMM YYYY');
                              // const updatedAtString = moment(r.updated_at).format('DD MMM YYYY');
                              return (
                                <tr key={r.resource_id}>
                                  <td className="p-2 whitespace-nowrap">
                                    {i + 1}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {r.resource_title}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {r.section_name}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {r.chapter_name}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {/* {r.section_name} */}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {r.created_by}
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
                                        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-yellow-300 ring-1 ring-black ring-opacity-5 focus:outline-none border border-black">
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
                                                  href='#'

                                                  className={classNames(
                                                    active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
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
                                                  onClick={() => {
                                                    setSelectedResource(r)
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
        </div >
      </div >

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
                      Delete Resource
                    </Dialog.Title>
                    <div className='mt-4 h-px w-full bg-black'></div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure, you want to delete this resource?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-8 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => deleteResource()}
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


      <Transition.Root show={addDialog} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setAddDialog}>
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
                <div>
                  <div className=" text-center">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 text-left">
                      Add New Resource
                    </Dialog.Title>

                    <div className="mt-2">

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Resource Title
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            onChange={(event) => {
                              setResourceName(event.target.value)
                            }}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="px-4 py-2 max-w-lg block w-full text-lg shadow-sm border border-tcolor sm:max-w-xs border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Select Section
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            onChange={(event) => {
                              setSelectedSection(sections.find(s => s.section_id == event.target.value))
                              setChaptersArray(selectedSection.chapters_array)
                              setSelectedChapter(chaptersArray[0])
                            }}
                            id="name"
                            name="name"
                            type='text'
                            className="rounded-lg px-4 py-2 pr-4 text-lg w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                          >
                            {
                              sections.map(s => {
                                return <option key={s.section_id} value={s.section_id}>{s.section_title}</option>
                              })
                            }
                          </select>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Select Lecture
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            type='text'
                            className="rounded-lg px-4 py-2 pr-4 text-lg w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                          >
                            {
                              chaptersArray.map(s => {
                                return <option key={s.chapter_id} value={s.chapter_id}>{s.chapter_title}</option>
                              })
                            }
                          </select>
                        </div>
                      </div>




                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          File
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            type='text'
                            className="rounded-lg px-4 py-2 pr-4 text-lg w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                          >
                            <option value="pdf">pdf</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">

                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="grid grid-cols-4 gap-4">

                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                              <div className="flex text-xl text-gray-600">
                                <label htmlFor="thumbnail-file-upload" className="text-xl w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-bcolor text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                                  <span>{file ? file.name : 'Browse'}</span>
                                  <input id="thumbnail-file-upload" name="thumbnail-file-upload" type="file" className="sr-only" onChange={(event) => {
                                    readFile(event, setFile)
                                    event.target.value = null
                                  }} />
                                </label>
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                              <div
                                onClick={() => {
                                  // setFile(null)
                                }}
                                type="button"
                                className="bg-white ml-4 text-sm leading-4 font-medium text-gray-700 cursor-pointer self-center	"
                              >
                                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.23734 10.2302H6.07109C3.52734 10.2302 1.46484 12.2927 1.46484 14.8364L1.46484 20.9302C1.46484 23.4727 3.52734 25.5352 6.07109 25.5352H19.9836C22.5273 25.5352 24.5898 23.4727 24.5898 20.9302V14.8239C24.5898 12.2877 22.5336 10.2302 19.9973 10.2302H18.8186" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M13.0273 1.73781V16.7891" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M9.38281 5.39844L13.0266 1.73844L16.6716 5.39844" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={() => addResource()}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      setAddDialog(false)
                      setResourceName('')
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog >
      </Transition.Root >

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
  console.log(token)

  const fetch = require("node-fetch")
  const body = {
    "course_id": context.params.id
  }

  const resources = await fetch(Constants.BASE_URL + "api/admin/list_course_resourse", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "accesstoken": token
    }
  })
    .then(res => res.json()
    )
    .then(json => json.result)
    .catch(err => {
      console.log(err)
    })

  const sections = await fetch(Constants.BASE_URL + "api/admin/courseSectionChapters?course_id=" + courseId, {
    method: "get",
    headers: {
      "accesstoken": token
    }
  })
    .then(res => res.json()
    )
    .then(json => json.result)
    .catch(err => {
      console.log(err)
    })
  console.log(resources)
  return {
    props: {
      token, resources, sections, courseId
    },
  };
}
