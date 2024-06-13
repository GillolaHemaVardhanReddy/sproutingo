import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../pages/Home';
import MainLayOut from '../layouts/MainLayOut';
import ProductDisplay from '../pages/ProductDisplay';
import ProductDisplayLayout from '../layouts/ProductDisplayLayout';

export const clientRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayOut/>}>
      <Route index element={<Home/>}/>
      <Route path='products' element={<ProductDisplayLayout/>}>
        <Route index element={<ProductDisplay/>}/>
        <Route path=':id'/>
      </Route>
    </Route>
  )
) 