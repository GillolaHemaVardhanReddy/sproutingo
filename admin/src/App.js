import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import RootLayout from './layouts/RootLayout';
import HomeLayout from './layouts/HomeLayout';
const SiteRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/admin' element={<RootLayout/>}>
      <Route path='home' element={<HomeLayout/>}>
        
      </Route>
      <Route path='auth'>
        
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
