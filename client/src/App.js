import { RouterProvider } from 'react-router-dom';
import './App.css';
import { clientRouter } from './routes';


function App() {
  return (
    <>
      <RouterProvider router={clientRouter}/>
    </>
  );
}

export default App;
