import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import MainLayOut from './layouts/MainLayOut';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

const SiteRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayOut/>}>
      <Route index element={<Home/>}/>
      <Route path='signup' element={<SignUp/>}/>
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
