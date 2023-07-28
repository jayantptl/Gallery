import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const contObjU = useContext(AuthContext);
  if (contObjU.user) {
    document.body.style = {
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh"
    }
  }

  return (

    <div className="App container">
      <BrowserRouter>
        <Navbar />
        <div class="quote">
          <div>
            <div> <p className='gal_quote'>“Photography is the story I fail to put into words.”</p></div>
            <div><p id='auther'>-Destin Sparks</p></div>
            <div></div>
          </div>
        </div>

        <div className="pages ">
          <Routes>
            <Route
              path='/'
              element={contObjU.user ? <Gallery /> : <Navigate to="/login" />}
            />
            <Route
              path='/login'
              element={!contObjU.user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path='/signup'
              element={!contObjU.user ? <Signup /> : <Navigate to="/" />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
