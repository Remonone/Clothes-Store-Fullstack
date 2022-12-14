import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Page from "./pages/static/Page";
import './App.scss'
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { authentication } from "./redux/reducers/AccountReducer";
import Profile from "./pages/Profile/Profile";

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
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
