import { useState } from 'react'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import Registration from './regform'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './DashBoard'

function App() {
  // const nav=useNavigate()

  return (
    <>
    <BrowserRouter>
       <Routes>
          <Route  path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
       </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
