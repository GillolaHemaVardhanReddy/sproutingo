import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

export const clientRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayOut/>}>
        
      </Route>
    )
  )