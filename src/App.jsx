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
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from './context/authContext'
import Navbar3 from './Components/Navbar3'



function App() {

  const location = useLocation();
  const {userLoggedIn} = useAuth();
 
  // check if current route is signup or login
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login" ;
  const isSellPage = location.pathname === "/sell";

  let NavBarToShow;

  if(isAuthPage){
    NavBarToShow = <AuthNavbar/>;
  }else if(isSellPage){
    NavBarToShow = <Navbar3/>;
  }else{
    NavBarToShow = <NavBar/>;
  }

  return (
    <>


      {/* Show normal navbar except on login/signup */}
      {NavBarToShow}
      
      
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buy' element={<Buy />} />
          <Route path='/sell' element={userLoggedIn? <Sell/> : <Navigate to="/login"/>}
          
          />
          <Route path='/signup' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        

        {/* Hide footer on signup/login if you want */}
        {!isAuthPage && <Footer />}
        <Toaster/>

      </main>




    </>
  )
}

export default App
