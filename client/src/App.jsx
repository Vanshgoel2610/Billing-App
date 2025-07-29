import { useContext, useState } from 'react'
import './App.css'
import Menubar from './Components/Menubar/Menubar.jsx'
import {Routes, Route, useLocation, Navigate} from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ManageCategories from './pages/ManageCategories/ManageCategories.jsx';
import ManageUsers from './pages/ManageUsers/ManageUsers.jsx';
import ManageItems from './pages/ManageItems/ManageItems.jsx';
import Cart from './pages/Cart/Cart.jsx';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login.jsx';
import OrderHistory from './pages/OrderHistory/OrderHistory.jsx';
import { AppContext } from './context/AppContext.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

function App() {
  const location = useLocation()
  const {auth} = useContext(AppContext)

  const LoginRoute = ({element}) => {
    if(auth.token) {
      return <Navigate to="/dashboard" replace />
    }
    return element
  }

  const ProtectedRoute = ({element, allowedRoles}) => {
    if(!auth.token) {
      return <Navigate to='/login' replace />
    }
    if(allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />
    }

    return element
  }

  return (
    <div>
        {location.pathname !== "/login" && <Menubar/>}
        <Toaster/>
        <Routes>
          {/* Admin only routes */}
            <Route path = "/dashboard" element = {<Dashboard/>}/>
            <Route path = "/cart" element = {<Cart/>}/>

            <Route path = "/categories" element = {<ProtectedRoute element={<ManageCategories/>} allowedRoles={['ROLE_ADMIN']} />} />
            <Route path = "/users" element = {<ProtectedRoute element={<ManageUsers/>} allowedRoles={['ROLE_ADMIN']} />}/>
            <Route path = "/items" element = {<ProtectedRoute element={<ManageItems/>} allowedRoles={['ROLE_ADMIN']} />}/>

            <Route path = "/login" element = {<LoginRoute element={<Login/>} />}/>
            <Route path = "/orders" element = {<OrderHistory/>}/>
            <Route path = "/" element = {<Dashboard/>}/>
            <Route path = "*" element = {<NotFound/>}/>
        </Routes>
    </div>
  )
}

export default App