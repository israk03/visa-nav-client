import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllVisas from "../pages/AllVisas";
// import VisaDetails from "../pages/VisaDetails";
import MyApplications from "../pages/MyApplications";
import AddVisa from "../pages/AddVisa";
import MyVisas from "../pages/MyVisas";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import VisaDetails from "../components/VisaDetails";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/add-visa",
        element: (
          <PrivateRoute>
            <AddVisa></AddVisa>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-visas",
        element: (
          <PrivateRoute>
            <MyVisas></MyVisas>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-visas",
        element: <AllVisas></AllVisas>,
      },
      {
        path: "/visa/:id",
        element: (
          <PrivateRoute>
            <VisaDetails></VisaDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/my-applications",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
