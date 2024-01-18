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
                element: <TicketBookingPage />
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