import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Page from "./pages/static/Page";
import './App.scss'
import Login from "./pages/Login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Page element={<Home/>}/>
    },
    {
      path: '/login',
      element: <Page element={<Login/>}/>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
