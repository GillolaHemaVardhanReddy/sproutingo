import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import MainLayOut from './layouts/MainLayOut';
import Home from './pages/Home';

const SiteRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayOut/>}>
      <Route index element={<Home/>}/>
      <Route path='/menu' />
      <Route path='/subscribe'/>
      <Route path='/about'/>
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
