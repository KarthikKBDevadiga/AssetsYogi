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

export default function CourseManagementList({ }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [sections, setSections] = useState([]);

  const addChapter = (index) => {
    const tempList = sections.map((s, i) => {
      if (i == index) {
        s.chapters.push({ title: 'Chapter ' + (s.chapters.length + 1) + ' Title' })
      }
      return s
    })
    setSections(tempList)
  }
  const deleteChapter = (sectionIndex, chapterIndex) => {
    const tempList = sections.map((s, i) => {
      if (i == sectionIndex) {
        s.chapters.splice(chapterIndex, 1)
      }
      return s
    })
    setSections(tempList)
  }
  return (
    <>
      <MetaLayout />
      <div className='font-raleway'>
        <NavigationLayout show={sidebarOpen} setShow={setSidebarOpen} selectedId={3} />
        <div className="md:pl-64 flex flex-col flex-1">
          <HeaderLayout show={sidebarOpen} setShow={setSidebarOpen} />

          <main className="flex-1">
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
            <div>
              {
                sections.map((s, i) =>
                  <div>
                    <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
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
                          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-bluecolor cursor-pointer"
                        >
                          Add Chapter
                        </div>
                      </div>
                    </div>
                    {
                      s.chapters.map((c, j) =>
                        <div className="border-t border-gray-200 px-2 py-2 pl-12 flex justify-between items-center space-x-3">
                          <div className="flex">
                            <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4">
                              <div className="text-2xl font-bold text-tcolor self-top col-span-1 sm:col-span-1 self-center">{c.title}:</div>
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
                                deleteChapter(i, j)
                              }}
                              type="button"
                              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-bluecolor cursor-pointer"
                            >
                              Delete
                            </div>
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
