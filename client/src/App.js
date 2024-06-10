import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import MainLayOut from './layouts/MainLayOut';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Activateauth from './pages/Activateauth';
import Login from './pages/Login';

const SiteRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayOut/>}>
      <Route index element={<Home/>}/>
      <Route path='auth'>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='signin' element={<Login/>}/>
        <Route path='activate/:token' element={<Activateauth/>}/>
      </Route>
      <Route />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={SiteRouter}/>
    </>
  );
}

export default App;
