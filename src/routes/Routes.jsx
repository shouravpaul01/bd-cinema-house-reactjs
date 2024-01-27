import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/main/Home/HomePage";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import MoviesPage from "../view/admin/Movies/MoviesPage";
import AddandEditPage from "../view/admin/Movies/AddandEdit/AddandEditPage";
import ShowsPage from "../view/admin/Shows/ShowsPage";
import AddShowPage from "../view/admin/Shows/AddShow/AddShowPage";
import EditShowPage from "../view/admin/Shows/EditShow/EditShowPage";
import TicketBookingPage from "../view/main/TicketBooking/TicketBookingPage";
import SignInAndUp from "../view/main/SignInAndUp/SignInAndUP";
import PrivateRoute from "./PrivateRoute";
import BookingSuccessPage from "../view/main/TicketBooking/BookingSuccessPage";
import BookingCencelPage from "../view/main/TicketBooking/BookingCencelPage";
import MyBookingPage from "../view/main/TicketBooking/MyBookingPage";
import ShowBookingPage from "../view/admin/Booking/ShowBookingPage";
import UserPage from "../view/admin/User/UserPage";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,

        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/ticket',
                element: <PrivateRoute><TicketBookingPage /></PrivateRoute>
            },
            {
                path: '/ticket-booking/success/:bookingId',
                element: <PrivateRoute><BookingSuccessPage /></PrivateRoute>
            },
            {
                path: '/ticket-booking/cencel/:bookingId',
                element: <PrivateRoute><BookingCencelPage /></PrivateRoute>
            },
            {
                path: '/my-booking',
                element: <PrivateRoute><MyBookingPage /></PrivateRoute>
            },
            {
                path: '/signin',
                element: <SignInAndUp />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><AdminRoute><AdminLayout /></AdminRoute></PrivateRoute>,
        children: [
            {
                path: "/dashboard/all-user",
                element: <PrivateRoute><AdminRoute><UserPage /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/movies",
                element: <PrivateRoute><AdminRoute><MoviesPage /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/movie/add",
                element: <PrivateRoute><AdminRoute><AddandEditPage /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/shows",
                element: <PrivateRoute><AdminRoute><ShowsPage /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/show/add",
                element: <PrivateRoute><AdminRoute><AddShowPage /></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/show/edit",
                element: <PrivateRoute><AdminRoute><EditShowPage /></AdminRoute></PrivateRoute>
            }, 
            {
                path: "/dashboard/all-booking",
                element: <PrivateRoute><AdminRoute><ShowBookingPage /></AdminRoute></PrivateRoute>
            },
        ]
    }
])

export default router