import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AddProducts from "../Pages/AddProducts";
import ManageProducts from "../Pages/ManageProducts";
import UpdateProducts from "../Pages/UpdateProducts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Orders from "../Pages/Orders/Orders";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                // loader: async () => fetch('http://localhost:5000/store')
            },
            {
                path: '/addproducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/manageproducts',
                element:
                    <PrivateRoute>
                        <ManageProducts></ManageProducts>
                    </PrivateRoute>,
                loader: async () => fetch(`http://localhost:5000/products`)
            },
            {
                path: '/update/:id',
                element: <UpdateProducts></UpdateProducts>,
                loader: async ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <SignUp></SignUp>
            },
            {
                path: '/orders',
                element:
                    <PrivateRoute>
                        <Orders></Orders>
                    </PrivateRoute>
            },
        ]
    },
    {
        path: '*',
        element: <div>
            <p className="text-4xl my-16 text-yellow-500">404. Page not Found</p>
        </div>
    }
]);