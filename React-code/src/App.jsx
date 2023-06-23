import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Index from './pages';
import Home from "./pages/app-pages/Home"
import Navbar from './components/Navbar';


function App() {

  return (
    <>

      <Router>

        <Navbar />

          <Routes>

              <Route path='/' element={<Index/>}></Route>
              <Route path='/home' element={<Home/>}></Route>     
        
          </Routes>

      </Router>


    </>
  )
}

export default App;
