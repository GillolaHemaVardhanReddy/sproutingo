import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import RootLayout from './layouts/RootLayout';
import HomeLayout from './layouts/HomeLayout';
import Products from './pages/Products';
const SiteRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route path='admin' element={<HomeLayout/>}>
        <Route path='products' element={<Products/>}/>
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
