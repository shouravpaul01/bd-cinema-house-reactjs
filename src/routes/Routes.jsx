import { createBrowserRouter } from "react-router-dom";
<<<<<<< HEAD
=======
// import HomePage from "../view/main/Home/HomePage";
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
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
<<<<<<< HEAD
import ErrorPage from "../view/shared/Errors/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute roles={["Admin", "User"]}>
        <MainLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TicketBookingPage />,
      },
      {
        path: "/ticket-booking/success/:bookingId",
        element: <BookingSuccessPage />,
      },
      {
        path: "/ticket-booking/cencel/:bookingId",
        element: <BookingCencelPage />,
      },
      {
        path: "/my-booking",
        element: <MyBookingPage />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute roles={["Admin"]}>
        <AdminLayout />
      </PrivateRoute>
    ),

    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/",
        element: <HomeDashboardPage />,
      },
      {
        path: "/dashboard/all-user",
        element: <UserPage />,
      },
      {
        path: "/dashboard/movies",
        element: <MoviesPage />,
      },
      {
        path: "/dashboard/shows",
        element: <ShowsPage />,
      },

      {
        path: "/dashboard/show/edit",
        element: <ShowsPage />,
      },
      {
        path: "/dashboard/all-booking",
        element: <ShowBookingPage />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignInAndUpPage />,
  },
]);

export default router;
=======


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
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
