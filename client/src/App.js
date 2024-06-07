import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import AdminLayout from './layouts/Admin/AdminLayout';

const SiteRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/auth' element={<AdminLayout/>}>
      
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
