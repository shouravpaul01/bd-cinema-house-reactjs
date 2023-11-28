import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/main/Home/HomePage";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import MoviesPage from "../view/admin/Movies/MoviesPage";
import AddandEditPage from "../view/admin/Movies/AddandEdit/AddandEditPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,

        children: [
            {
                path: '/',
                element: <HomePage />
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
            }
        ]
    }
])

export default router