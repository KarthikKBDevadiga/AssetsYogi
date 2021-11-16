import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuAlt2Icon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

const navigation = [
    {
        name: 'Dashboard',
        href: '#',
        icon: HomeIcon,
        current: false,
        i: <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M21 21h-3V11h3v10zm-5 0h-3V8h3v13zm-5 0H8V5h3v16zm-5 0H3v-8h3v8z"
            ></path>
        </svg>
    },
    {
        name: 'Featured Category Management', href: '#', icon: UsersIcon, current: false,
        i: <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M12 4.5a1 1 0 011 1v5.923l4.696 2.711a1 1 0 01-1 1.732L12 13.155l-4.696 2.711a1 1 0 11-1-1.732L11 11.423V5.5a1 1 0 011-1zM8.278 8.804a1 1 0 00-1-1.733l-1.407.813a1 1 0 00-.5.866v1.625a1 1 0 102 0V9.327l.907-.523zM16.722 7.071a1 1 0 10-1 1.733l.907.523v1.048a1 1 0 102 0V8.75a1 1 0 00-.5-.866l-1.407-.813zM11.093 16.822a1 1 0 10-1 1.732l1.407.812a1 1 0 001 0l1.407-.813a1 1 0 10-1-1.732l-.907.524-.907-.523z"
            ></path>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.5 1.134a1 1 0 011 0l4.33 2.5 4.33 2.5a1 1 0 01.5.866v10a1 1 0 01-.5.866l-8.66 5a1 1 0 01-1 0l-8.66-5a1 1 0 01-.5-.866V7a1 1 0 01.5-.866l8.66-5zm.5 2.02L4.34 7.578v8.846L12 20.845l7.66-4.422V7.577L12 3.155z"
                clipRule="evenodd"
            ></path>
        </svg>

    },
    {
        name: 'Course Management', href: '#', icon: FolderIcon, current: true,
        i: <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 6.5C3 3.875 3.028 3 6.5 3s3.5.875 3.5 3.5.011 3.5-3.5 3.5S3 9.125 3 6.5zM14 6.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5S14 9.125 14 6.5zM3 17.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5S3 20.125 3 17.5zM14 17.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5-3.5-.875-3.5-3.5z"
                clipRule="evenodd"
            ></path>
        </svg>

    },
    {
        name: 'Insights Management', href: '#', icon: CalendarIcon, current: false,
        i: <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 4.5a9 9 0 00-9 9c0 2.6 1.1 4.94 2.865 6.585A1 1 0 014.5 21.548 10.973 10.973 0 011 13.5c0-6.075 4.925-11 11-11s11 4.925 11 11c0 3.177-1.348 6.04-3.5 8.048a1 1 0 11-1.365-1.463A8.973 8.973 0 0021 13.5a9 9 0 00-9-9zM12 8a5.5 5.5 0 00-3.75 9.524 1 1 0 11-1.363 1.463 7.5 7.5 0 1110.226 0 1 1 0 11-1.364-1.463A5.5 5.5 0 0012 8zm0 3.5a2 2 0 00-1.363 3.463 1 1 0 01-1.364 1.463 4 4 0 115.454 0 1 1 0 01-1.364-1.463A2 2 0 0012 11.5z"
                clipRule="evenodd"
            ></path>
        </svg>

    },
    {
        name: 'App User Management', href: '#', icon: InboxIcon, current: false,
        i: <svg
            width="20"
            height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.983 15.3457C8.11536 15.3457 4.8125 15.9305 4.8125 18.2724C4.8125 20.6143 8.0944 21.22 11.983 21.22C15.8506 21.22 19.1525 20.6343 19.1525 18.2933C19.1525 15.9524 15.8715 15.3457 11.983 15.3457Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9829 12.0059C14.521 12.0059 16.5782 9.94779 16.5782 7.40969C16.5782 4.8716 14.521 2.81445 11.9829 2.81445C9.44484 2.81445 7.38675 4.8716 7.38675 7.40969C7.37817 9.93922 9.42198 11.9973 11.9506 12.0059H11.9829Z" stroke="currentColor" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round" />
        </svg>



    },
    {
        name: 'Roles Management', href: '#', icon: ChartBarIcon, current: false,
        i: <svg
            width="20"
            height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.8867 10.8977C19.2817 10.7017 20.3557 9.5057 20.3587 8.0567C20.3587 6.6287 19.3177 5.4447 17.9527 5.2207" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.7305 14.25C21.0815 14.452 22.0245 14.925 22.0245 15.9C22.0245 16.571 21.5805 17.007 20.8625 17.281" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8887 14.6641C8.67469 14.6641 5.92969 15.1511 5.92969 17.0961C5.92969 19.0401 8.65769 19.5411 11.8887 19.5411C15.1027 19.5411 17.8467 19.0591 17.8467 17.1131C17.8467 15.1671 15.1197 14.6641 11.8887 14.6641Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8854 11.888C13.9944 11.888 15.7044 10.179 15.7044 8.069C15.7044 5.96 13.9944 4.25 11.8854 4.25C9.77643 4.25 8.06643 5.96 8.06643 8.069C8.05843 10.171 9.75543 11.881 11.8574 11.888H11.8854Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.88606 10.8977C4.49006 10.7017 3.41706 9.5057 3.41406 8.0567C3.41406 6.6287 4.45506 5.4447 5.82006 5.2207" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.044 14.25C2.693 14.452 1.75 14.925 1.75 15.9C1.75 16.571 2.194 17.007 2.912 17.281" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    },
    {
        name: 'Banners Management', href: '#', icon: ChartBarIcon, current: false,
        i: <svg
            width="20"
            height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.95313 1.56928C4.97872 1.55924 5.00476 1.55024 5.03119 1.54232C5.13428 1.51135 5.23881 1.49787 5.34146 1.50027H18.6586C18.7609 1.49787 18.8651 1.51127 18.9679 1.54203C18.9946 1.55002 19.021 1.55912 19.0469 1.56928C19.2682 1.6559 19.4422 1.81368 19.5517 2.00691L23.3585 8.6372C23.4373 8.76874 23.4867 8.91991 23.4977 9.08162C23.4987 9.09729 23.4995 9.11298 23.4998 9.12867C23.5001 9.14363 23.5001 9.15859 23.4997 9.17354C23.4943 9.41359 23.4042 9.63274 23.2582 9.80236L12.7686 22.1401C12.7418 22.1723 12.7131 22.2026 12.6827 22.231C12.6312 22.2791 12.5748 22.3216 12.5145 22.3578C12.3625 22.449 12.1857 22.5003 12 22.5003C11.6971 22.5003 11.4178 22.3638 11.2315 22.1402L0.741894 9.80242C0.595786 9.63272 0.505681 9.41344 0.500268 9.17324C0.499738 9.15033 0.499994 9.12739 0.50104 9.10446C0.50872 8.93414 0.559005 8.77492 0.641491 8.63719L4.44831 2.00698C4.5578 1.81371 4.73179 1.65591 4.95313 1.56928ZM10.1636 3.50027H6.7299L7.94034 6.94221L10.1636 3.50027ZM9.54096 8.15027H14.4591L12 4.3433L9.54096 8.15027ZM16.0597 6.94221L13.8364 3.50027H17.2701L16.0597 6.94221ZM18.9012 4.8907L20.7727 8.15027H17.7549L18.9012 4.8907ZM12 18.486L14.9315 10.1503H9.06854L12 18.486ZM5.09881 4.8907L6.24512 8.15027H3.22728L5.09881 4.8907ZM6.94847 10.1503H3.66278L9.26628 16.741L6.94847 10.1503ZM20.3372 10.1503H17.0516L14.7337 16.741L20.3372 10.1503Z" fill="currentColor" />
        </svg>

    },
    {
        name: 'Subscription Management', href: '#', icon: ChartBarIcon, current: false,
        i: <svg
            width="20"
            height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.72436 8.452L7.29036 7.194C6.5541 8.18515 5.92177 9.24942 5.40336 10.37L3.72436 8.452ZM1.24736 8.659L4.55036 12.433L4.07236 13.629C3.99961 13.8105 3.98168 14.0094 4.02078 14.201C4.05989 14.3926 4.15431 14.5685 4.29236 14.707L4.60736 15.021C2.90336 16.941 1.96336 18.95 1.05136 21.684C0.992602 21.8602 0.984074 22.0493 1.02673 22.23C1.0694 22.4108 1.16156 22.5761 1.29289 22.7075C1.42423 22.8388 1.58955 22.931 1.77032 22.9736C1.95109 23.0163 2.14017 23.0078 2.31636 22.949C5.05036 22.037 7.05936 21.097 8.97936 19.393L9.29336 19.707C9.43174 19.8452 9.60762 19.9398 9.79923 19.9791C9.99084 20.0184 10.1898 20.0006 10.3714 19.928L11.5674 19.45L15.3414 22.753C15.4643 22.8607 15.6118 22.9366 15.7708 22.974C15.9299 23.0115 16.0957 23.0095 16.2538 22.968C16.4119 22.9266 16.5574 22.847 16.6776 22.7363C16.7978 22.6256 16.8891 22.4871 16.9434 22.333L19.9294 13.873C21.9127 11.5261 23.0007 8.55267 23.0004 5.48V2C23.0004 1.73478 22.895 1.48043 22.7075 1.29289C22.5199 1.10536 22.2656 1 22.0004 1H18.5204C15.4481 0.99957 12.4751 2.0872 10.1284 4.07L1.66836 7.057C1.5144 7.11136 1.3761 7.2026 1.26553 7.32274C1.15496 7.44287 1.07549 7.58826 1.03406 7.74619C0.992625 7.90412 0.990495 8.06979 1.02785 8.22874C1.06521 8.38768 1.14092 8.53506 1.24836 8.658L1.24736 8.659ZM3.68536 20.315C4.31336 18.799 5.01736 17.593 6.02436 16.438L7.56236 17.976C6.40736 18.983 5.20136 19.687 3.68536 20.315ZM10.2414 17.827L9.70736 17.293L6.70736 14.293L6.17336 13.759L6.88336 11.984C7.53493 10.3556 8.4498 8.84551 9.59136 7.514L10.1674 6.841C11.2002 5.63612 12.4815 4.66898 13.9233 4.00598C15.3652 3.34297 16.9334 2.99979 18.5204 3H21.0004V5.48C21.0006 7.06697 20.6574 8.63519 19.9944 10.077C19.3314 11.5189 18.3642 12.8002 17.1594 13.833L16.4864 14.409C15.1548 15.5505 13.6447 16.4654 12.0164 17.117L10.2414 17.827ZM15.5484 20.276L13.6304 18.598C14.751 18.0796 15.8152 17.4473 16.8064 16.711L15.5484 20.276ZM15.0004 8C15.0004 7.73478 15.1057 7.48043 15.2933 7.29289C15.4808 7.10536 15.7351 7 16.0004 7C16.2656 7 16.5199 7.10536 16.7075 7.29289C16.895 7.48043 17.0004 7.73478 17.0004 8C17.0004 8.26522 16.895 8.51957 16.7075 8.70711C16.5199 8.89464 16.2656 9 16.0004 9C15.7351 9 15.4808 8.89464 15.2933 8.70711C15.1057 8.51957 15.0004 8.26522 15.0004 8ZM16.0004 5C15.2047 5 14.4416 5.31607 13.879 5.87868C13.3164 6.44129 13.0004 7.20435 13.0004 8C13.0004 8.79565 13.3164 9.55871 13.879 10.1213C14.4416 10.6839 15.2047 11 16.0004 11C16.796 11 17.5591 10.6839 18.1217 10.1213C18.6843 9.55871 19.0004 8.79565 19.0004 8C19.0004 7.20435 18.6843 6.44129 18.1217 5.87868C17.5591 5.31607 16.796 5 16.0004 5Z" fill="currentColor" />
        </svg>

    },
    {
        name: 'Payments Management', href: '#', icon: ChartBarIcon, current: false,
        i: <svg
            width="20"
            height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 2.5C2.61929 2.5 1.5 3.61929 1.5 5V19C1.5 20.3807 2.6193 21.5 4 21.5H14.2353C14.7876 21.5 15.2353 21.0523 15.2353 20.5C15.2353 19.9477 14.7876 19.5 14.2353 19.5H4C3.72385 19.5 3.5 19.2762 3.5 19V5C3.5 4.72386 3.72386 4.5 4 4.5H20C20.2762 4.5 20.5 4.72385 20.5 5V13C20.5 13.5523 20.9477 14 21.5 14C22.0523 14 22.5 13.5523 22.5 13V5C22.5 3.6193 21.3807 2.5 20 2.5H4Z" fill="currentColor" />
            <path d="M8.26822 6.85984C7.91466 6.43556 7.28409 6.37824 6.85981 6.7318C6.43554 7.08537 6.37821 7.71593 6.73178 8.14021L7.86494 9.5H7C6.44772 9.5 6 9.94772 6 10.5C6 11.0523 6.44772 11.5 7 11.5H9V12.5H7C6.44772 12.5 6 12.9477 6 13.5C6 14.0523 6.44772 14.5 7 14.5H9V16.5C9 17.0523 9.44772 17.5 10 17.5C10.5523 17.5 11 17.0523 11 16.5V14.5H13C13.5523 14.5 14 14.0523 14 13.5C14 12.9477 13.5523 12.5 13 12.5H11V11.5H13C13.5523 11.5 14 11.0523 14 10.5C14 9.94772 13.5523 9.5 13 9.5H12.1351L13.2682 8.14021C13.6218 7.71593 13.5645 7.08537 13.1402 6.7318C12.7159 6.37824 12.0853 6.43556 11.7318 6.85984L10 8.93797L8.26822 6.85984Z" fill="currentColor" />
            <path d="M18.7069 15.2071C19.0974 14.8165 19.0974 14.1834 18.7069 13.7929C18.3163 13.4024 17.6832 13.4024 17.2927 13.7929L14.7929 16.2929C14.5976 16.4882 14.5 16.7441 14.5 17C14.5 17.1356 14.527 17.2649 14.5759 17.3828C14.6243 17.4999 14.696 17.6096 14.7908 17.705L14.7932 17.7074L17.2929 20.2071C17.6834 20.5976 18.3166 20.5976 18.7071 20.2071C19.0976 19.8166 19.0976 19.1834 18.7071 18.7929L17.9142 18H21.5C22.0523 18 22.5 17.5523 22.5 17C22.5 16.4477 22.0523 16 21.5 16H17.9141L18.7069 15.2071Z" fill="currentColor" />
        </svg>

    },
    {
        name: 'Static Content Management', href: '#', icon: ChartBarIcon, current: false,
        i: <svg
            width="20"
            height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7379 2.76175H8.08493C6.00493 2.75375 4.29993 4.41175 4.25093 6.49075V17.2037C4.20493 19.3167 5.87993 21.0677 7.99293 21.1147C8.02393 21.1147 8.05393 21.1157 8.08493 21.1147H16.0739C18.1679 21.0297 19.8179 19.2997 19.8029 17.2037V8.03775L14.7379 2.76175Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.4766 2.75V5.659C14.4766 7.079 15.6246 8.23 17.0446 8.234H19.7996" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.2867 15.3594H8.88672" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.2427 11.6055H8.88672" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    },
    {
        name: 'Certificate Management', href: '#', icon: ChartBarIcon, current: false,
        i: <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
        >
            <mask
                id="mask0_266_13859"
                style={{ maskType: "alpha" }}
                width="20"
                height="20"
                x="2"
                y="2"
                maskUnits="userSpaceOnUse"
            >
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M2 2h19.953v19.954H2V2z"
                    clipRule="evenodd"
                ></path>
            </mask>
            <g mask="url(#mask0_266_13859)">
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7.651 3.5C5.13 3.5 3.5 5.229 3.5 7.904v8.146c0 2.676 1.63 4.404 4.151 4.404h8.646c2.525 0 4.156-1.728 4.156-4.404V7.904c.002-1.363-.414-2.501-1.202-3.29-.728-.729-1.747-1.114-2.949-1.114H7.651zm8.646 18.454H7.651C4.271 21.954 2 19.581 2 16.05V7.904C2 4.373 4.271 2 7.651 2h8.651c1.608 0 2.995.537 4.01 1.554 1.061 1.062 1.643 2.607 1.641 4.351v8.145c0 3.531-2.273 5.904-5.656 5.904z"
                    clipRule="evenodd"
                ></path>
            </g>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.857 7.69a1.096 1.096 0 10.002 2.192 1.096 1.096 0 00-.002-2.193m0 3.691a2.598 2.598 0 01-2.595-2.595A2.598 2.598 0 018.858 6.19a2.6 2.6 0 012.596 2.595v.001a2.598 2.598 0 01-2.596 2.595M3.749 20.111a.75.75 0 01-.653-1.117c.06-.108 1.495-2.645 3.074-3.945 1.252-1.03 2.6-.464 3.686-.007.639.269 1.243.523 1.823.523.532 0 1.199-.94 1.789-1.769.819-1.156 1.749-2.464 3.11-2.464 2.17 0 4.044 1.936 5.05 2.976l.117.12a.751.751 0 01-.016 1.061.748.748 0 01-1.06-.016l-.118-.122c-.852-.881-2.438-2.519-3.972-2.519-.588 0-1.278.973-1.89 1.832-.837 1.18-1.704 2.401-3.01 2.401-.883 0-1.692-.34-2.405-.641-1.134-.478-1.648-.631-2.151-.217-1.364 1.124-2.706 3.498-2.72 3.521a.749.749 0 01-.654.383"
                clipRule="evenodd"
            ></path>
        </svg>

    },
    {
        name: 'Referral & Gifts', href: '#', icon: ChartBarIcon, current: false,
        i: <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
        >
            <mask
                id="mask0_266_13870"
                style={{ maskType: "alpha" }}
                width="21"
                height="21"
                x="2"
                y="2"
                maskUnits="userSpaceOnUse"
            >
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M2 2h20.003v20.001H2V2z"
                    clipRule="evenodd"
                ></path>
            </mask>
            <g mask="url(#mask0_266_13870)">
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M10.945 20.075c.59.576 1.54.57 2.126-.02l.722-.72a3.026 3.026 0 012.123-.878h1.03c.834 0 1.512-.678 1.512-1.51v-1.03c0-.8.31-1.554.876-2.12l.72-.722a1.51 1.51 0 00.002-2.147l-.721-.722a2.992 2.992 0 01-.877-2.124V7.055c0-.834-.678-1.512-1.512-1.512h-1.028a2.991 2.991 0 01-2.121-.874l-.722-.723a1.518 1.518 0 00-2.147 0l-.72.72a3.004 3.004 0 01-2.124.877h-1.03a1.514 1.514 0 00-1.51 1.512V8.08c0 .801-.311 1.554-.875 2.122l-.71.711-.021.021a1.513 1.513 0 00.007 2.137l.722.722c.566.568.877 1.321.877 2.122v1.031c0 .833.677 1.511 1.51 1.511h1.028a2.99 2.99 0 012.122.877l.72.72c.007.006.014.013.02.021zm1.054 1.926a3.002 3.002 0 01-2.145-.897l-.71-.709a1.505 1.505 0 00-1.063-.438H7.055a3.014 3.014 0 01-3.011-3.01v-1.032a1.5 1.5 0 00-.44-1.063l-.718-.718a3.015 3.015 0 01-.008-4.26l.728-.73c.28-.284.438-.663.438-1.064V7.055c0-1.66 1.35-3.01 3.01-3.012h1.03a1.51 1.51 0 001.066-.44l.715-.717a3.014 3.014 0 014.259-.01l.73.73a1.5 1.5 0 001.064.437h1.028a3.015 3.015 0 013.012 3.012v1.027c0 .401.156.78.439 1.065l.718.72c.569.564.885 1.32.888 2.124a2.991 2.991 0 01-.875 2.133l-.733.731c-.281.283-.437.66-.437 1.062v1.03a3.015 3.015 0 01-3.011 3.01h-1.031c-.396 0-.783.16-1.064.44l-.718.717a3 3 0 01-2.135.887z"
                    clipRule="evenodd"
                ></path>
            </g>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.43 15.32a.749.749 0 01-.53-1.28l5.14-5.14a.75.75 0 111.06 1.06L9.96 15.1a.744.744 0 01-.53.22zM14.505 15.498a1.003 1.003 0 01-1.005-1c0-.553.443-1 .996-1h.009a1 1 0 110 2zM9.505 10.498a1.003 1.003 0 01-1.005-1c0-.553.443-1 .996-1h.009a1 1 0 110 2z"
                clipRule="evenodd"
            ></path>
        </svg>

    },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Login() {
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
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                    <nav className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                        'mr-4 flex-shrink-0 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
                        <div className="flex items-center flex-shrink-0">
                            {/* <img
                                className="block lg:hidden h-8 w-auto"
                                src="../img/logo.png"
                                alt="Workflow"
                            /> */}
                            <img
                                className="h-16 w-auto"
                                src="../img/logo.png"
                                alt="Workflow"
                            />
                        </div>
                        <div className="mt-5 flex-grow flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-blue-800 ' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <div className={classNames(
                                            item.current ? 'text-blue-800' : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}>
                                            {item.i}
                                        </div>
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 px-4 flex justify-between">
                            <div className="flex-1 flex">

                            </div>
                            <div className="ml-4 flex items-center md:ml-6">

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
                        </div>
                    </div>

                    <main className="flex-1">
                        <div className="py-6">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            </div>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                {/* Replace with your content */}
                                <div className="py-4">
                                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                                </div>
                                {/* /End replace */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
