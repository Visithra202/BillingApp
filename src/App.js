import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Side_bar from './mainPages/components/Side_bar.js';
import Main_bar from './mainPages/components/Main_bar.js';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Login from './mainPages/components/Login.js';

function App() {
  const [login, setLogin] = useState(false);
  return (
    <BrowserRouter>
      <div className='App container-fluid row vh-100 p-0 m-0'>
        {/* {!login && <div>
          <Login setLogin={setLogin}/>
        </div>} */}

        {/* {login&&<> */}
          <div className='sidebar bg-dark col-auto text-light px-2'>
            <Side_bar />
          </div>
          <div className='mainbar col p-0' style={{height:'100%'}}>
            <Main_bar setLogin={setLogin}/>
          </div>
        {/* </>} */}
      </div>
    </BrowserRouter>
  );
}

export default App;

