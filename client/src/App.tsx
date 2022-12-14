import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/view/Home";
import Page from "./pages/static/Page";
import './App.scss'
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { authentication } from "./redux/reducers/AccountReducer";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import LoadProduct from "./pages/LoadProduct";

function App() {
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    if(auth.isAuthenticated) dispatch(authentication(auth.token))
  }, [auth])

  const router = createBrowserRouter([
    {
      path: '',
      element: <Page element={<Home/>}/>
    },
    {
      path: '/login',
      element: <Page element={<Login/>}/>
    },
    {
      path: '/profile',
      element: <Page element={<Profile/>}/>
    },
    {
      path:'/register',
      element: <Page element={<Register/>}/>
    },
    {
      path: '/load',
      element: <Page element={<LoadProduct/>}/>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
