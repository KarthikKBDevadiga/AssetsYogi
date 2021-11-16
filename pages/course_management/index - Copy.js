/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Login() {
    return (
        <>
            <Disclosure as="nav" className="bg-white shadow">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <img
                                            className="block lg:hidden h-full w-auto"
                                            src="../img/logo.png"
                                            alt="Workflow"
                                        />
                                        <img
                                            className="hidden lg:block h-full w-auto"
                                            src="../img/logo.png"
                                            alt="Workflow"
                                        />
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="bg-white rounded-full flex text-sm border border-blue-100 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-100 duration-500 p-1">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                                <div className="self-center px-2 text-blue-800 font-semibold">
                                                    Prateek Sharma
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 self-center mr-2 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                                <div className="-mr-2 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">

                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">Tom Cook</div>
                                        <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Your Profile
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Settings
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>


            <div style={{
                height: 'calc(100vh - 4rem)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(/img/login_bg.png)'
            }}>
                <div className="max-w-3xl mx-auto h-full flex items-center">
                    <div className="h-full w-full relative">
                        <div className="text-center text-2xl text-white absolute left-0 right-0 p-6 ">Admin Portal</div>
                        <div className="lg:px-32 sm:p-4 w-full absolute top-1/2 transform -translate-y-1/2">
                            <div className="text-white text-sm">Registered Email ID</div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="mt-1 bg-white block w-full px-3 py-2 sm:text-sm rounded outline-none border focus:border-indigo-700 duration-500"
                                placeholder="Enter your registered email address"
                                onKeyPress={() => {
                                    setError('')
                                }}
                            />
                            <div className="mt-4 text-white text-sm">Password</div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="mt-1 bg-white block w-full px-3 py-2 sm:text-sm rounded outline-none border focus:border-indigo-700 duration-500"
                                placeholder="Enter your password"
                                onKeyPress={() => {
                                    setError('')
                                }}
                            />

                        </div>
                        <div className="flex w-full mt-8 gap-4 absolute left-0 right-0 bottom-0 p-6">
                            <div className="select-none cursor-pointer w-1/2 rounded px-3 py-2 bg-white bg-opacity-50 hover:bg-opacity-100 text-white hover:text-blue-800 text-center duration-500">
                                Forgot Password
                            </div>
                            <div className="select-none cursor-pointer w-1/2 rounded px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white text-center duration-500">
                                Login
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
