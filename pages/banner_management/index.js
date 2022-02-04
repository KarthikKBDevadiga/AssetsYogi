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
import LoadingDialog from '../../components/LoadingDialog'
import { XIcon } from '@heroicons/react/outline'
import { makePublicRouterInstance, useRouter } from 'next/dist/client/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BannerManagementList({ data, token }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [loadingDialog, setLoadingDialog] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState(-1)
  const [addBannerDialog, setAddBannerDialog] = useState(false)

  const [bannerTitle, setBannerTitle] = useState()
  const [publishDate, setPublishDate] = useState()
  const [endDate, setEndDate] = useState()
  const [textOverBanner, setTextOverBanner] = useState()
  const [bannerFile, setBannerFile] = useState()
  const [onClickUrl, setOnClickUrl] = useState()

  const router = useRouter()

  const deleteCourse = () => {
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

    fetch(Constants.BASE_URL + "api/admin/actionCourses?course_id=" + selectedCourseId + '&status=deleted', requestOptions)
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
  const readFile = (event, set) => {
    const fileList = event.target.files;
    if (fileList != null && fileList.length == 1) {
      set(fileList[0])
    }
  }

  const addBanner = () => {
    if (
      bannerFile == null || publishDate == null || bannerTitle == null || endDate == null || textOverBanner == null || onClickUrl == bull``
    ) return false
    setAddBannerDialog(false)
    setLoadingDialog(true)

    console.log(bannerTitle)
    console.log(publishDate)
    console.log(endDate)
    console.log(textOverBanner)
    console.log(bannerFile.name)
    console.log(onClickUrl)


    const fetch = require("node-fetch")

    var myHeaders = new Headers()
    myHeaders.append("accesstoken", token)
    var formdata = new FormData();
    formdata.append("banner_title", bannerTitle);
    formdata.append("text_over_banner", textOverBanner);
    formdata.append("end_date", endDate);
    formdata.append("start_date", publishDate);
    formdata.append("banner_type", 'normal');
    formdata.append("banner_file_type", 'image');
    formdata.append("item_type", 'courses');
    formdata.append('item_id', 33)
    if (bannerFile != null)
      formdata.append('banner_file', bannerFile, bannerFile.name)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    fetch(Constants.BASE_URL + "api/admin/addBanner", requestOptions)
      .then(res => res.json())
      .then(
        json => {
          setLoadingDialog(false)
          console.log(json)
          if (json.code == 200) {
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
        <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={7} />
        <div className="md:pl-64 flex flex-col flex-1">
          <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

          <main className="flex-1">
            <div className="bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <div className="mt-1 flex ">
                    <a
                      href='#'
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-bluecolor"
                    >
                      Add A Banner For Empty Course Screen
                    </a>
                  </div>
                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                  <div
                    onClick={() => {
                      setAddBannerDialog(true)
                    }}
                    type="button"
                    className="cursor-pointer  relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-bluecolor"
                  >
                    Add New Banner
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4  ">
              <div className="flex flex-col">
                <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg ">
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
                              Banner Title
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date Of Publish
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              End Date
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Views
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>

                            <th scope="col" className="relative px-2 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                          {
                            data.map((d, i) => {
                              // const createdAtString = moment(d.created_at).format('DD MMM YYYY');
                              // const updatedAtString = moment(d.updated_at).format('DD MMM YYYY');
                              return (
                                <tr key={d.banner_id}>
                                  <td className="p-2 whitespace-nowrap">
                                    {i + 1}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {d.banner_title}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {d.start_date}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {d.end_date}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {d.views}
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    {d.message}
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
                                                    setSelectedCourseId(d.banner_id)
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
                                // <tr key={d.course_id}>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {i + 1}
                                //   </td>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {d.course_name}
                                //   </td>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {d.price_subscriber + ', ' + d.price_non_subscriber}
                                //   </td>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {d.language}
                                //   </td>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {createdAtString}
                                //   </td>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {updatedAtString}
                                //   </td>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {d.purchase_count}
                                //   </td>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {d.duration}
                                //   </td>
                                //   <td className="p-2 whitespace-nowrap">
                                //     {d.status}
                                //   </td>
                                //   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                //     <Menu as="div" className="relative inline-block text-left">
                                //       <div>
                                //         <Menu.Button className="inline-flex justify-center w-full rounded-md border border-black shadow-sm px-4 py-2 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50">
                                //           Action
                                //           <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                //         </Menu.Button>
                                //       </div>

                                //       <Transition
                                //         as={Fragment}
                                //         enter="transition ease-out duration-100"
                                //         enterFrom="transform opacity-0 scale-95"
                                //         enterTo="transform opacity-100 scale-100"
                                //         leave="transition ease-in duration-75"
                                //         leaveFrom="transform opacity-100 scale-100"
                                //         leaveTo="transform opacity-0 scale-95"
                                //       >
                                //         <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-yellow-300 ring-1 ring-black ring-opacity-5 focus:outline-none border border-black">
                                //           <div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <a
                                //                   href="#"
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 rounded-t-md font-bold'
                                //                   )}
                                //                 >
                                //                   View Course
                                //                 </a>
                                //               )}
                                //             </Menu.Item>

                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <a
                                //                   href={"/course_management/update?id=" + d.course_id}

                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold'
                                //                   )}
                                //                 >
                                //                   Edit Course
                                //                 </a>
                                //               )}
                                //             </Menu.Item>
                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <div
                                //                   onClick={() => {
                                //                     setSelectedCourseId(d.course_id)
                                //                     setDeleteDialog(true)
                                //                   }}
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold cursor-pointer'
                                //                   )}
                                //                 >
                                //                   Delete Course
                                //                 </div>
                                //               )}
                                //             </Menu.Item>
                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <div
                                //                   onClick={() => {
                                //                     setSelectedCourseId(d.course_id)
                                //                     if (d.status == 'published')
                                //                       setUnpublishDialog(true)
                                //                     else if (d.status == 'unpublished')
                                //                       setPublishDialog(true)
                                //                   }}
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold cursor-pointer'
                                //                   )}
                                //                 >
                                //                   {d.status == 'published' ? 'Unpublish Course' : d.status == 'unpublished' ? 'Publish Course' : 'Delete'}
                                //                 </div>
                                //               )}
                                //             </Menu.Item>
                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <a
                                //                   href={"/course_management/" + d.course_id + "/curriculm"}
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold'
                                //                   )}
                                //                 >
                                //                   Curriculm
                                //                 </a>
                                //               )}
                                //             </Menu.Item>
                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <a
                                //                   href={"/course_management/" + d.course_id + "/rating"}
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold'
                                //                   )}
                                //                 >
                                //                   Ratings
                                //                 </a>
                                //               )}
                                //             </Menu.Item>
                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <div
                                //                   onClick={() => {
                                //                     setSelectedCourseId(d.course_id)
                                //                     setAnnouncementDialog(true)
                                //                   }}
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold cursor-pointer'
                                //                   )}
                                //                 >
                                //                   Announcements
                                //                 </div>
                                //               )}
                                //             </Menu.Item>
                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <a
                                //                   href={"/course_management/" + d.course_id + "/resources"}
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold'
                                //                   )}
                                //                 >
                                //                   Resources
                                //                 </a>
                                //               )}
                                //             </Menu.Item>
                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <a
                                //                   href="#"
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold'
                                //                   )}
                                //                 >
                                //                   Course Assessment
                                //                 </a>
                                //               )}
                                //             </Menu.Item>
                                //             <div className='w-full h-px bg-black'></div>
                                //             <Menu.Item>
                                //               {({ active }) => (
                                //                 <a
                                //                   href="#"
                                //                   className={classNames(
                                //                     active ? 'bg-yellow-400 text-gray-900' : 'text-gray-700',
                                //                     'block px-4 py-2 text-sm text-center duration-500 font-bold rounded-b-md'
                                //                   )}
                                //                 >
                                //                   Disable Lectures Subtitle
                                //                 </a>
                                //               )}
                                //             </Menu.Item>
                                //           </div>
                                //         </Menu.Items>
                                //       </Transition>
                                //     </Menu>
                                //   </td>
                                // </tr>
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
                      Delete Course
                    </Dialog.Title>
                    <div className='mt-4 h-px w-full bg-black'></div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure, you want to delete this course?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-8 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => deleteCourse()}
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


      <Transition.Root show={addBannerDialog} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setAddBannerDialog}>
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
                      Add New Banner
                    </Dialog.Title>

                    <div className="mt-2">

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="title" className="self-center block font-medium text-gray-700 sm:mt-px ">
                          Title
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            onChange={(event) => {
                              setBannerTitle(event.target.value)
                            }}
                            type="text"
                            name="title"
                            id="title"
                            autoComplete="given-name"
                            className="px-4 py-2 max-w-lg block w-full text-lg shadow-sm border border-tcolor sm:max-w-xs border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor="publish_date" className="self-center block font-medium text-gray-700 sm:mt-px ">
                          Publish Date
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            onChange={(event) => {
                              setPublishDate(event.target.value)
                            }}
                            type="date"
                            name="publish_date"
                            id="publish_date"
                            autoComplete="given-name"
                            className="px-4 py-2 max-w-lg block w-full text-lg shadow-sm border border-tcolor sm:max-w-xs border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor="end_date" className="self-center block font-medium text-gray-700 sm:mt-px ">
                          End Date
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            onChange={(event) => {
                              setEndDate(event.target.value)
                            }}
                            type="date"
                            name="end_date"
                            id="end_date"
                            className="px-4 py-2 max-w-lg block w-full text-lg shadow-sm border border-tcolor sm:max-w-xs border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor="text_over_banner" className="self-center block font-medium text-gray-700 sm:mt-px ">
                          Text Over Banner
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            onChange={(event) => {
                              setTextOverBanner(event.target.value)
                            }}
                            type="text"
                            name="text_over_banner"
                            id="text_over_banner"
                            className="px-4 py-2 max-w-lg block w-full text-lg shadow-sm border border-tcolor sm:max-w-xs border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor='banner-file-upload' className="self-center block font-medium text-gray-700 sm:mt-px">
                          Banner File
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="grid grid-cols-4 gap-4">

                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <div className="flex text-xl text-gray-600">
                                <label htmlFor="banner-file-upload" className="overflow-hidden text-xl w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-bcolor text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                                  <span >{bannerFile ? bannerFile.name : 'Browse'}</span>
                                  <input id="banner-file-upload" name="banner-file-upload" type="file" className="sr-only" onChange={(event) => {
                                    readFile(event, setBannerFile)
                                    event.target.value = null
                                  }} accept="image/*" />
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
                              <div
                                onClick={() => {
                                  setBannerFile(null)
                                }}
                                type="button"
                                className="bg-white ml-4 text-sm leading-4 font-medium text-gray-700 cursor-pointer self-center	"
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g id="Iconly/Light/Delete">
                                    <g id="Delete">
                                      <path id="Stroke 1" d="M19.3238 9.4668C19.3238 9.4668 18.7808 16.2018 18.4658 19.0388C18.3158 20.3938 17.4788 21.1878 16.1078 21.2128C13.4988 21.2598 10.8868 21.2628 8.27881 21.2078C6.95981 21.1808 6.13681 20.3768 5.98981 19.0458C5.67281 16.1838 5.13281 9.4668 5.13281 9.4668" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path id="Stroke 3" d="M20.708 6.23828H3.75" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path id="Stroke 5" d="M17.4386 6.239C16.6536 6.239 15.9776 5.684 15.8236 4.915L15.5806 3.699C15.4306 3.138 14.9226 2.75 14.3436 2.75H10.1106C9.53163 2.75 9.02363 3.138 8.87363 3.699L8.63063 4.915C8.47663 5.684 7.80063 6.239 7.01562 6.239" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label htmlFor="on_click_url" className="self-center block font-medium text-gray-700 sm:mt-px ">
                          On Click URL
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            onChange={(event) => {
                              setOnClickUrl(event.target.value)
                            }}
                            type="url"
                            id="on_click_url"
                            name="on_click_url"
                            className="px-4 py-2 max-w-lg block w-full text-lg shadow-sm border border-tcolor sm:max-w-xs border-gray-300 rounded-md"
                          />
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={() => addBanner()}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      setAddBannerDialog(false)
                      setBannerTitle()
                      setPublishDate()
                      setEndDate()
                      setTextOverBanner()
                      setBannerFile()
                      setOnClickUrl()
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

  if (token == null || token == '') {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }

  const fetch = require("node-fetch")


  const data = await fetch(Constants.BASE_URL + "api/admin/bannerList", {
    method: "get",
    headers: {
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
      data, token
    },
  };
}
