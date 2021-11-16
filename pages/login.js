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
                            </div>
                        </div>

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
