import cookies from 'next-cookies'
import { useState, useEffect } from 'react'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import Constants from '../../helpers/Constants'

import dynamic from 'next/dynamic'
import MetaLayout from '../../components/ MetaLayout'
import LoadingDialog from '../../components/LoadingDialog'
import { useRouter } from 'next/dist/client/router'

var Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false
})

export default function AddCourseManagement({ insightTypes, token }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [type, setType] = useState(0);
  const [insightFile, setInsightFile] = useState()
  const [thumbnail, setThumbnail] = useState()

  const [wywtl, setWywtl] = useState();
  const [description, setDescription] = useState();
  const [about, setAbout] = useState();
  const [courseName, setCourseName] = useState()
  const [creatorName, setCreatorName] = useState()
  const [label, setLabel] = useState()
  const [priceSubscriber, setPriceSubscriber] = useState()
  const [priceNonSubscriver, setPriceNonSubscriber] = useState()
  const [validity, setValidity] = useState()
  const [courseSummary, setCourseSummary] = useState()
  const [language, setLanguage] = useState()
  const [subtitleLanguage, setSubtitleLanguage] = useState()
  const [cancellationTime, setCancellationTime] = useState()
  const [validityType, setValidityType] = useState()
  const [loadingDialog, setLoadingDialog] = useState(false)
  // const [advFile, setAdvFile] = useState()
  // const [srtFile, setSRTFile] = useState()

  const router = useRouter()

  const add = () => {
    setLoadingDialog(true)

    const fetch = require("node-fetch")

    var myHeaders = new Headers()
    myHeaders.append("accesstoken", token)

    // if (title == null || description == null || authorName == null || tags == null || type == null || insightFile == null || thumbnail == null) {
    // 	setLoadingDialog(false)
    // 	return
    // }

    console.log(wywtl)
    var formdata = new FormData();
    formdata.append("course_name", courseName);
    formdata.append("creator_name", creatorName);
    formdata.append("label", label);
    formdata.append("price_subscriber", priceSubscriber);
    formdata.append("price_non_subscriber", priceNonSubscriver);
    formdata.append("language", language);
    formdata.append("subtitle", subtitleLanguage);
    formdata.append("course_validity_time", validity);
    formdata.append("course_validity_type", validityType);
    formdata.append("summary", courseSummary);
    formdata.append("what_you_learn", wywtl);
    formdata.append("description", description);
    formdata.append("about", about);
    // if (insightFile != null)
    //   formdata.append("file", insightFile, insightFile.name);
    // if (subtitle != null)
    //   formdata.append("subtitle_file", subtitle, subtitle.name);
    // if (thumbnail != null)
    //   formdata.append("thumbnail", thumbnail, thumbnail.name);
    // formdata.append("video_availablity", "free");
    // formdata.append("insight_type", "0");
    // formdata.append("on_click", "1");
    // formdata.append("video_url", link);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(Constants.BASE_URL + "api/admin/addCourse", requestOptions)
      .then(res => res.json())
      .then(
        json => {
          setLoadingDialog(false)
          console.log(json)
          if (json.code == 200) {
            router.back()
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

  return (
    <>
      <MetaLayout />
      <div className='font-raleway'>
        <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={3} />

        <div className="md:pl-64 flex flex-col flex-1">
          <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

          <main className="flex-1 p-4">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">

                <div className="grid grid-cols-6 grid-row-9 gap-x-2 gap-y-4">

                  <div className="col-span-6 sm:col-span-3 sm:mr-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Course Name:</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-2">
                        <input
                          placeholder='Money Save Mantra'
                          onChange={(e) => setCourseName(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:ml-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Creator Name:</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          placeholder='Prateek Sharma'
                          onChange={(e) => setCreatorName(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:mr-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Language:</div>
                      <div className="mt-1 text-xl text-gray-900 sm:mt-0 col-span-2">
                        <select
                          onChange={(e) => setLanguage(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        >

                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:ml-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Subtitle Language:</div>
                      <div className="mt-1 text-xl text-gray-900 sm:mt-0 col-span-2">
                        <select
                          onChange={(e) => setSubtitleLanguage(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        >

                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:mr-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Course Purchase Cancellation Time:</div>
                      <div className="mt-1 text-xl text-gray-900 sm:mt-0 col-span-2">
                        <select
                          onChange={(e) => setType(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        >

                          <option value="0">8 Hours</option>
                          <option value="1">12 Hours</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:ml-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Label:</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          placeholder='Bestseller'
                          onChange={(e) => setLabel(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        />
                      </div>
                    </div>
                  </div>


                  <div className="col-span-6 sm:col-span-3 sm:mr-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Price for Subscriber (₹):</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-2">
                        <input
                          placeholder='5000'
                          onChange={(e) => setPriceSubscriber(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:ml-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Price for Non Subscriber (₹):</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          placeholder='5600'
                          onChange={(e) => setPriceNonSubscriber(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:mr-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Course Validity:</div>
                      <div className="mt-1 text-xl text-gray-900 sm:mt-0 col-span-2">
                        <div className="grid grid-cols-4 gap-4">

                          <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              placeholder='365'
                              onChange={(e) => setValidity(e.target.value)}
                              id="name"
                              name="name"
                              type='text'
                              className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                            />
                          </div>
                          <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex">
                            <select
                              onChange={(e) => setValidityType(e.target.value)}
                              id="name"
                              name="name"
                              type='text'
                              className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                            >

                              <option value="days">Days</option>
                              <option value="months">Months</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:mr-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Course Preview:</div>
                      <div className="mt-1 text-xl text-gray-900 sm:mt-0 col-span-2">
                        <div className="grid grid-cols-3 gap-3">

                          <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-1">
                            <select
                              onChange={(e) => setType(e.target.value)}
                              id="name"
                              name="name"
                              type='text'
                              className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                            >

                              <option value="0">Video</option>
                              <option value="1">Image</option>
                            </select>
                          </div>
                          <label htmlFor="insight-file-upload" className="col-span-1 text-xl w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-bcolor text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                            <span>Browse</span>
                            <input id="insight-file-upload" name="file-upload" type="file" className="sr-only" onChange={(event) => {
                              readFile(event, setInsightFile)
                              event.target.value = null
                            }} />
                          </label>
                          <div className='col-span-1 self-center'>
                            <button
                              type="button"
                              className="bg-white ml-2 text-sm leading-4 font-medium text-gray-700 "
                            >
                              <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.23734 10.2302H6.07109C3.52734 10.2302 1.46484 12.2927 1.46484 14.8364L1.46484 20.9302C1.46484 23.4727 3.52734 25.5352 6.07109 25.5352H19.9836C22.5273 25.5352 24.5898 23.4727 24.5898 20.9302V14.8239C24.5898 12.2877 22.5336 10.2302 19.9973 10.2302H18.8186" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.0273 1.73781V16.7891" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.38281 5.39844L13.0266 1.73844L16.6716 5.39844" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="bg-white ml-4 text-sm leading-4 font-medium text-gray-700 "
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
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:mr-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Similar Courses:</div>
                      <div className="mt-1 text-xl text-gray-900 sm:mt-0 col-span-2">
                        <select
                          onChange={(e) => setType(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        >

                          <option value="0">Update</option>
                          <option value="1">Here</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 sm:mr-2">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Thumbnail Preview:</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-2">
                        <div className="grid grid-cols-4 gap-4">

                          <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                            <div className="flex text-xl text-gray-600">
                              <label htmlFor="insight-file-upload" className="text-xl w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-bcolor text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                                <span>Browse</span>
                                <input id="insight-file-upload" name="file-upload" type="file" className="sr-only" onChange={(event) => {
                                  readFile(event, setThumbnail)
                                  event.target.value = null
                                }} />
                              </label>
                            </div>
                          </div>
                          <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                            <button
                              type="button"
                              className="bg-white ml-2 text-sm leading-4 font-medium text-gray-700 "
                            >
                              <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.23734 10.2302H6.07109C3.52734 10.2302 1.46484 12.2927 1.46484 14.8364L1.46484 20.9302C1.46484 23.4727 3.52734 25.5352 6.07109 25.5352H19.9836C22.5273 25.5352 24.5898 23.4727 24.5898 20.9302V14.8239C24.5898 12.2877 22.5336 10.2302 19.9973 10.2302H18.8186" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.0273 1.73781V16.7891" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.38281 5.39844L13.0266 1.73844L16.6716 5.39844" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="bg-white ml-4 text-sm leading-4 font-medium text-gray-700 "
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
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-span-6">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-12 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-2 sm:col-span-2 self-center">Course Summary:</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                        <textarea
                          placeholder='Selected ideas and opportunities to save money after 2 years of analysis'
                          onChange={(e) => setCourseSummary(e.target.value)}
                          id="name"
                          name="name"
                          type='text'
                          className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-12 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-2 sm:col-span-2 self-center">What will you learn::</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                        <Editor setData={setWywtl} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-12 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-2 sm:col-span-2 self-center">Description:</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                        <Editor setData={setDescription} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="py-1 sm:py-1 sm:grid sm:grid-cols-12 sm:gap-4">
                      <div className="text-2xl font-bold text-tcolor self-top col-span-2 sm:col-span-2 self-center">About the Courses:</div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-10 sm:col-span-10">
                        <Editor setData={setAbout} />
                      </div>
                    </div>
                  </div>



                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-center sm:px-6 align-center">
                <a onClick={
                  e => add()
                }
                  className="cursor-pointer w-32 bg-indigo-600 border border-transparent rounded-xl shadow-sm py-2 px-4 inline-flex justify-center text-xl font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  style={
                    {
                      backgroundColor: '#2D9CDB'
                    }
                  }
                >
                  Add
                </a>
                <a href="#"
                  className="cursor-pointer w-32 ml-4 bg-bcolor border border-transparent rounded-xl shadow-sm py-2 px-4 inline-flex justify-center text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </a>
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
      insightTypes, token
    },
  };
}
