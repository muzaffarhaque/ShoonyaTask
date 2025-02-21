
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Details, Home} from './pages';
import { ToastContainer } from 'react-toastify';
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/details/:id",
            element: <Details/>
        }
    ]);
    return (
    <> 
     <RouterProvider router={router}/>
     <ToastContainer /> 
    </>)
}

export default App
