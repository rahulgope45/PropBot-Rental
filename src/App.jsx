import { Routes , Route , Navigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Buy from './Pages/Buy'
import NavBar from './Components/NavBar'
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {


  return (
    <>
    <NavBar />
    <main>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/buy' element={<Buy />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    
    </main>
 

    
      
    </>
  )
}

export default App
