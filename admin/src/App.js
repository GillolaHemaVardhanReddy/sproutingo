import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import RootLayout from './layouts/RootLayout';
import HomeLayout from './layouts/HomeLayout';
import Products from './pages/Products';
import ProductLayout from './layouts/ProductLayout';
import CreateProduct from './components/CreateProduct/CreateProduct';
import Login from './pages/Login';
import AuthLayout from './layouts/AuthLayout';
const SiteRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route path='admin' element={<HomeLayout/>}>
        <Route path='products' element={<ProductLayout/>}>
            <Route index element={<Products/>}/>
            <Route path='create' element={<CreateProduct/>}/>
        </Route>
      </Route>
      <Route path='admin-auth' element={<AuthLayout/>}>
        <Route path='login' element={<Login/>}/>
      </Route>
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
