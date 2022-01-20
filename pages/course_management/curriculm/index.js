import cookies from 'next-cookies'
import moment from 'moment'
import { useState } from 'react'
import NavigationLayout from '../../../components/NavigationLayout'
import HeaderLayout from '../../../components/HeaderLayout'
import Constants from '../../../helpers/Constants'
import MetaLayout from '../../../components/ MetaLayout'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const contentTypes = [
  {
    id: 'article',
    text: 'Article/ Text File'
  },
  {
    id: 'video',
    text: 'Video'
  },
  {
    id: 'link',
    text: 'Link'
  }
]

export default function CourseManagementList({ }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [sections, setSections] = useState([]);

  const createKey = () => {
    return Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 4);
  }
  const addChapter = (index) => {
    const key = createKey()
    const tempList = sections.map((s, i) => {
      if (i == index)
        s.chapters.push({ id: key, title: '', contentType: 'article', link: '', isAvailableForNonSubscriber: false })
      return s
    })
    setSections(tempList)
  }
  const deleteChapter = (sectionIndex, chapterIndex) => {
    const tempList = sections.map((s, i) => {
      if (i == sectionIndex) {
        s.chapters.splice(chapterIndex, 1);
      }
      return s
    })
    setSections(tempList)
    console.log(sections)
  }
  const updateChapterTitle = ((sectionIndex, chapterIndex, title) => {
    const selectedSection = sections[sectionIndex]
    const selectedChapter = selectedSection.chapters[chapterIndex];
    selectedChapter.title = title;
  })
  const updateChapterContentType = ((sectionIndex, chapterIndex, contentType) => {
    const tempList = sections.map((s, i) => {
      if (i == sectionIndex) {
        s.chapters[chapterIndex].contentType = contentType
        s.chapters[chapterIndex].link = ''
      }
      return s
    })
    setSections(tempList)
  })
  const updateChapterLink = ((sectionIndex, chapterIndex, link) => {
    const tempList = sections.map((s, i) => {
      if (i == sectionIndex)
        s.chapters[chapterIndex].link = link
      return s
    })
    setSections(tempList)
  })
  const updateChapterIsAvailableForNonSubscriber = ((sectionIndex, chapterIndex, isAvailableForNonSubscriber) => {
    const tempList = sections.map((s, i) => {
      if (i == sectionIndex)
        s.chapters[chapterIndex].isAvailableForNonSubscriber = isAvailableForNonSubscriber
      return s
    })
    setSections(tempList)
  })
  return (
    <>
      <MetaLayout />
      <div className='font-raleway'>
        <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={3} />
        <div className="md:pl-64 flex flex-col flex-1">
          <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

          <main className="flex-1 ">
            <div className='p-4 text-right'>
              <div

                onClick={() => {
                  const tempList = sections.map(s => s)
                  tempList.push({ title: 'Section ' + (sections.length + 1) + ' Title', chapters: [] })
                  setSections(tempList)
                  console.log(sections)
                }}
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-bluecolor cursor-pointer"
              >
                Add Section
              </div>
            </div>
            <div className='mb-4'>
              {
                sections.map((s, i) =>
                  <div key={i}>
                    <div className="px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
                      <div className="flex">
                        <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                          <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">{s.title}:</div>
                          <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              placeholder='Course Overview'
                              id="name"
                              name="name"
                              type='text'
                              className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          onClick={() => {
                            addChapter(i)
                          }}
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-bluecolor-dark cursor-pointer"
                        >
                          Add Chapter
                        </div>
                      </div>
                    </div>
                    {
                      s.chapters.map((c, j) =>
                        <div className='pl-12' key={i + '_' + j}>
                          <div className=" px-3 py-2 flex justify-between items-center space-x-3">
                            <div className="flex">
                              <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                                {/* <div className="text-xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Chapter {j + 1} Titles:</div> */}
                                <div className="text-xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Chapter {j + 1} title:</div>
                                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <input
                                    id={c.id + '_title'}
                                    name={c.id + '_title'}
                                    key={c.id + '_title'}
                                    onChange={(e) => { updateChapterTitle(i, j, e.target.value) }}
                                    placeholder='Course Overview'
                                    type='text'
                                    defaultValue={c.title}
                                    className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 self-end">
                              <div
                                onClick={() => {
                                  deleteChapter(i, j)
                                }}
                                type="button"
                                className="relative inline-flex items-bottom border border-transparent  rounded-md text-red-500 cursor-pointer"
                              >
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className='border border-black px-4 py-2 mr-3'>
                            <div className=" flex justify-between items-center space-x-3">
                              <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                                {/* <div className="text-xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Chapter {j + 1} Titles:</div> */}
                                <div className="text-xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Content Type:</div>
                                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <select
                                    onChange={(e) => updateChapterContentType(i, j, e.target.value)}
                                    defaultValue={c.contentType}
                                    id={c.id + '_contentType'}
                                    name={c.id + '_contentType'}
                                    key={c.id + '_contentType'}
                                    type='text'
                                    className="rounded-lg px-4 py-2 pr-4 text-lg w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                                  >
                                    {
                                      contentTypes.map(ct => (
                                        <option key={ct.id} value={ct.id}>{ct.text}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            {
                              c.contentType == 'article' ?
                                <div className='mt-2 gap-4'>
                                  <div className='flex '>
                                    <div className="flex text-xl text-gray-600">
                                      <label htmlFor="thumbnail-file-upload" className="text-xl w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-bcolor text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        <span>Browse</span>
                                        <input id="thumbnail-file-upload" name="thumbnail-file-upload" type="file" className="sr-only" onChange={(event) => {
                                          readFile(event, setThumbnail)
                                          event.target.value = null
                                        }} />
                                      </label>
                                    </div>
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
                                  </div>
                                  <div className='mt-2 text-right'>
                                    <input
                                      type="checkbox"
                                      id={c.id + '_isAvailableForNonSubscriber'}
                                      name={c.id + '_isAvailableForNonSubscriber'}
                                      onChange={(e) => { updateChapterIsAvailableForNonSubscriber(i, j, e.target.value) }}
                                      defaultValue={c.isAvailableForNonSubscriber} />
                                    <label className='ml-2' for={c.id + '_isAvailableForNonSubscriber'}>Available to non-subscribers for view only</label><br></br>
                                  </div>
                                </div>
                                :
                                c.contentType == 'video' ?
                                  <div className='mt-2 gap-4'>
                                    <div>

                                      <div className='flex '>
                                        <div className="flex text-xl text-gray-600">
                                          <label htmlFor="thumbnail-file-upload" className="text-xl w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-bcolor text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                                            <span>Browse</span>
                                            <input id="thumbnail-file-upload" name="thumbnail-file-upload" type="file" className="sr-only" onChange={(event) => {
                                              readFile(event, setThumbnail)
                                              event.target.value = null
                                            }} />
                                          </label>
                                        </div>
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
                                      </div>
                                      <div className='grid grid-cols-6 grid-row-9 gap-x-2 gap-y-4 mt-2'>
                                        <div className="col-span-6 sm:col-span-3 sm:mr-2">
                                          <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <div className="text-xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Thumbnail:</div>
                                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-2">
                                              <div className="grid grid-cols-4 gap-4">

                                                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                  <div className="flex text-xl text-gray-600">
                                                    <label htmlFor="thumbnail-file-upload" className="text-xl w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-bcolor text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                                                      <span>Browse</span>
                                                      <input id="thumbnail-file-upload" name="thumbnail-file-upload" type="file" className="sr-only" onChange={(event) => {
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
                                        <div className="col-span-6 sm:col-span-3 sm:mr-2">
                                          <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <div className="text-xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">Upload Subtitle file:</div>
                                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-2">
                                              <div className="grid grid-cols-4 gap-4">

                                                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                  <div className="flex text-xl text-gray-600">
                                                    <label htmlFor="thumbnail-file-upload" className="text-xl w-full relative inline-flex items-center space-x-2 px-4 py-2 border border-bcolor text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer">
                                                      <span>Browse</span>
                                                      <input id="thumbnail-file-upload" name="thumbnail-file-upload" type="file" className="sr-only" onChange={(event) => {
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
                                      </div>
                                    </div>
                                    <div className='mt-2 text-right'>
                                      <input
                                        type="checkbox"
                                        id={c.id + '_isAvailableForNonSubscriber'}
                                        name={c.id + '_isAvailableForNonSubscriber'}
                                        onChange={(e) => { updateChapterIsAvailableForNonSubscriber(i, j, e.target.value) }}
                                        defaultValue={c.isAvailableForNonSubscriber} />
                                      <label className='ml-2' for={c.id + '_isAvailableForNonSubscriber'}>Available to non-subscribers for view only</label><br></br>
                                    </div>
                                  </div> :
                                  <div className='mt-2 gap-4'>
                                    <input
                                      id={c.id + '_link'}
                                      name={c.id + '_link'}
                                      key={c.id + '_link'}
                                      onChange={(e) => { updateChapterLink(i, j, e.target.value) }}
                                      placeholder='https://youtube.com/345435gfgfg.454'
                                      type='url'
                                      defaultValue={c.link}
                                      className="rounded-lg px-4 py-2 pr-4 text-xl w-full outline-none border border-bcolor focus:border-fgreen-700 duration-500"
                                    />
                                    <div className='mt-2 text-right'>
                                      <input
                                        type="checkbox"
                                        id={c.id + '_isAvailableForNonSubscriber'}
                                        name={c.id + '_isAvailableForNonSubscriber'}
                                        onChange={(e) => { updateChapterIsAvailableForNonSubscriber(i, j, e.target.value) }}
                                        defaultValue={c.isAvailableForNonSubscriber} />
                                      <label className='ml-2' for={c.id + '_isAvailableForNonSubscriber'}>Available to non-subscribers for view only</label><br></br>
                                    </div>

                                  </div>
                            }
                          </div>
                        </div>

                      )
                    }
                  </div>
                )
              }
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


  return {
    props: {
    },
  };
}
