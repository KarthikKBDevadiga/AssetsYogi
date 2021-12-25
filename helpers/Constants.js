import AppUserManagement from "../components/icons/appUserManagement";
import BannerManagement from "../components/icons/bannerManagement";
import CategoryManagement from "../components/icons/categoryManagement";
import CertificateMangement from "../components/icons/certificateManagement";
import CourseManagement from "../components/icons/courseManagement";
import Dashboard from "../components/icons/dashboard";
import InsightManagement from "../components/icons/insightManagement";
import PaymentManagement from "../components/icons/paymentManagement";
import ReferralAndGifts from "../components/icons/referralAndGifts";
import RoleManagement from "../components/icons/roleManagement";
import StaticContentManagement from "../components/icons/staticContentManagement";
import SubscriptionManagement from "../components/icons/subscriptionManagement";
const Constants = {
    BASE_URL: 'http://54.245.144.158:6689/',
    NAVIGATION_ITEMS: [
        {
            id: 1,
            name: 'Dashboard',
            href: '#',
            icon: Dashboard
        },
        {
            id: 2,
            name: 'Featured Category Management',
            href: '#',
            icon: CategoryManagement
        },
        {
            id: 3,
            name: 'Course Management',
            href: '/course_management',
            icon: CourseManagement
        },
        {
            id: 4,
            name: 'Insights Management',
            href: '/insight_management',
            icon: InsightManagement
        },
        {
            id: 5,
            name: 'App User Management',
            href: '#',
            icon: AppUserManagement
        },
        {
            id: 6,
            name: 'Roles Management',
            href: '#',
            icon: RoleManagement
        },
        {
            id: 7,
            name: 'Banners Management',
            href: '#',
            icon: BannerManagement
        },
        {
            id: 8,
            name: 'Subscription Management',
            href: '#',
            icon: SubscriptionManagement
        },
        {
            id: 9,
            name: 'Payments Management',
            href: '#',
            icon: PaymentManagement
        },
        {
            id: 10,
            name: 'Static Content Management',
            href: '#',
            icon: StaticContentManagement
        },
        {
            id: 11,
            name: 'Certificate Management',
            href: '#',

            icon: CertificateMangement
        },
        {
            id: 12,
            name: 'Referral & Gifts',
            href: '#',
            icon: ReferralAndGifts
        },
    ],


}

export default Constants;