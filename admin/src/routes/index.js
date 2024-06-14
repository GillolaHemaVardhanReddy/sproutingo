import RootLayout from '../layouts/RootLayout';
import HomeLayout from '../layouts/HomeLayout';
import Products from '../pages/Products';
import ProductLayout from '../layouts/ProductLayout';
import CreateProduct from '../pages/CreateProduct';
import Login from '../pages/Login';
import AuthLayout from '../layouts/AuthLayout';
import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import UserLayout from '../layouts/UserLayout';
import Users from '../pages/Users';
import AnalyticsLayout from '../layouts/AnalyticsLayout';
import AnalyticsWelcome from '../components/AnalyticsWelcome/AnalyticsWelcome';
import OrdersLayout from '../layouts/OrdersLayout';
import { NotDeliveredOrdersDisplay } from '../components/NotDeliveredOrdersDisplay/NotDeliveredOrdersDisplay';
import {DeliveredOrdersDisplay} from '../components/DeliveredOrdersDisplay/DeliveredOrdersDisplay';
import ComplaintLayout from '../layouts/ComplaintLayout';
// import {fetchProductData} from '../helper/productsFetch'
import { UpdateOrder } from '../components/UpdateOrder/UpdateOrder';

export const SiteRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Outlet />}>
      <Route index element={<Navigate to='admin' replace />} />
      <Route path='admin' element={<RootLayout/>}>
        <Route index element={<Navigate to='manage' replace />} />
        <Route path='manage' element={<HomeLayout/>}>
          <Route index element={<Welcome/>}/>
          <Route path='products' element={<ProductLayout/>}>
            <Route index element={<Products/>} />
            <Route path='create' element={<CreateProduct/>}/>
          </Route>
          <Route path='users' element={<UserLayout/>}>
            <Route index element={<Users />} />
          </Route>
          <Route path='analytics' element={<AnalyticsLayout/>}>
            <Route index element={<AnalyticsWelcome/>}/>
          </Route>
          <Route path="orders" element={<OrdersLayout/>}>
            <Route index element={<NotDeliveredOrdersDisplay/>} />
            <Route path="notdelivered" element={<NotDeliveredOrdersDisplay />} />
            <Route path="delivered" element={<DeliveredOrdersDisplay/>} />
            <Route path="notdelivered/:id" element={<NotDeliveredOrdersDisplay />} />
            <Route path="delivered/:id" element={<NotDeliveredOrdersDisplay />} />
            <Route path="update/:id" element={<UpdateOrder/>} />
          </Route>
          <Route path='complaints' element={<ComplaintLayout/>}/>
        </Route>
      </Route>
      <Route path='/admin/auth' element={<AuthLayout/>}>
        <Route index element={<Navigate to='login' replace />} />
        <Route path='login' element={<Login/>}/> 
      </Route>
    </Route>
    
  )
);
