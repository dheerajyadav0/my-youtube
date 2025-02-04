import './App.css';
import Body from './components/Body';
import Head from './components/Head';
import { Provider } from 'react-redux';
import store from './utils/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mainconatiner from './components/Mainconatiner';
import WatchPage from './components/WatchPage';
import Demo from './components/Demo';

const appRouter = createBrowserRouter([{
  path:"/",
  element:<Body/>,
  children:[
    {
      path:"/",
      element:<Mainconatiner/>,
    },
    {
      path:"watch",
      element:<WatchPage/>,
    },
    {
      path:"demo",
      element:<Demo/>,
    }
  ]
}])

function App() {
  return (
    <Provider store={store}>
    <div>
 
  <Head />
  <RouterProvider router={appRouter}/>


{/* 
-head
-body
-sidebar
    - mainMenu
-maincontainer
    - ButtonsList
    - VedioContainer
     - Vediocard


*/}

  </div>
  </Provider>
  );
}

export default App;
