import { RouterProvider } from 'react-router-dom';
import './App.css';
import { SiteRouter } from './routes/index';

function App() {
  // if (localStorage.getItem('isAuth') === null) {
  //   localStorage.setItem('isAuth', 'false');
  // }
  return (
    <>
      <RouterProvider router={SiteRouter}/>
    </>
  );
}

export default App;
