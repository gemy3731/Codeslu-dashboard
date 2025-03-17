import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

const routes = createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {path:'/',element:<Dashboard/>},
    {path:'/dashboard',element:<Dashboard/>},
    {path:'/login',element:<Login/>},
    {path:'/signup',element:<Signup/>},
    {path:'/forgotpassword',element:<ForgotPassword/>},
  ]}
])
function App() {
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  );
}

export default App;
