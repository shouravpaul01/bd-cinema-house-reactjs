import { createBrowserRouter } from "react-router-dom";
// import HomePage from "../view/main/Home/HomePage";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import MoviesPage from "../view/admin/Movies/MoviesPage";
import ShowsPage from "../view/admin/Shows/ShowsPage";
import TicketBookingPage from "../view/main/TicketBooking/TicketBookingPage";
import PrivateRoute from "./PrivateRoute";
import BookingSuccessPage from "../view/main/TicketBooking/BookingSuccessPage";
import BookingCencelPage from "../view/main/TicketBooking/BookingCencelPage";
import MyBookingPage from "../view/main/TicketBooking/MyBookingPage";
import ShowBookingPage from "../view/admin/Booking/ShowBookingPage";
import UserPage from "../view/admin/User/UserPage";
import HomeDashboardPage from "../view/admin/Home/HomeDashboardPage";
import SignInAndUpPage from "../view/main/SignInAndUp/SignInAndUpPage";


const router = createBrowserRouter([
    {
        path: "/",
         element:<PrivateRoute roles={['Admin','User']}> <MainLayout /></PrivateRoute>,
        // element:<MainLayout />,
        children: [
            {
                path: '/',
                element: <TicketBookingPage />
            },
            {
                path: '/ticket-booking/success/:bookingId',
                element: <BookingSuccessPage />
            },
            {
                path: '/ticket-booking/cencel/:bookingId',
                element: <BookingCencelPage />
            },
            {
                path: '/my-booking',
                element: <MyBookingPage />
            },
            
        ]
    },
    {
        path: '/signin',
        element: <SignInAndUpPage />
    },
    {
        path: '/dashboard',
        element:<PrivateRoute roles={['Admin']}><AdminLayout /></PrivateRoute> ,
        children: [
            {
                path: "/dashboard",
                element: <HomeDashboardPage />
            },
            {
                path: "/dashboard/all-user",
                element: <UserPage />
            },
            {
                path: "/dashboard/movies",
                element: <MoviesPage />
            },
            {
                path: "/dashboard/shows",
                element: <ShowsPage />
            },
           
            {
                path: "/dashboard/show/edit",
                element: <ShowsPage />
            }, 
            {
                path: "/dashboard/all-booking",
                element: <ShowBookingPage />
            },
        ]
    }
])

export default router