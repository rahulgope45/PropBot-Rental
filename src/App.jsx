import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Buy from './Pages/Buy'
import NavBar from './Components/NavBar'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './Components/Footer'
import Signin from './Pages/Signin'
import Login from './Pages/Login'
import AuthNavbar from './Components/AuthNavbar'
import Sell from './Pages/Sell'



function App() {

  const location = useLocation();

  // check if current route is signup or login
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>


      {/* Show normal navbar except on login/signup */}
      {!isAuthPage ? <NavBar /> : <AuthNavbar />}
      
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buy' element={<Buy />} />
          <Route path='/sell' element={<Sell/>}/>
          <Route path='/signup' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        

        {/* Hide footer on signup/login if you want */}
        {!isAuthPage && <Footer />}

      </main>




    </>
  )
}

export default App
