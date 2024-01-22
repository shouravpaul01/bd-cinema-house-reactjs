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
                element: <PrivateRoute><BookingSuccessPage/></PrivateRoute>
            },
            {
                path: '/ticket-booking/cencel/:bookingId',
                element: <PrivateRoute><BookingCencelPage/></PrivateRoute>
            },
            {
                path: '/my-booking',
                element: <PrivateRoute><MyBookingPage/></PrivateRoute>
            },
            {
                path: '/signin',
                element: <SignInAndUp />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <AdminLayout />,
        children: [
            {
                path: "/dashboard/movies",
                element: <MoviesPage />
            },
            {
                path: "/dashboard/movie/add",
                element: <AddandEditPage />
            },
            {
                path: "/dashboard/shows",
                element: <ShowsPage />
            },
            {
                path: "/dashboard/show/add",
                element: <AddShowPage />
            },
            {
                path: "/dashboard/show/edit",
                element: <EditShowPage />
            }
        ]
    }
])

export default router