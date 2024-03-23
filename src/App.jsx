/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import User from './pages/user/User'
import Login from './pages/login/Login'
import NotFound from './pages/notfound/NotFound'
import WebDev from './pages/services/webDev/WebDev'
import { useEffect, useState } from 'react'

function App() {
  const [token, setToken] = useState(localStorage.getItem('poshcoder'))
  
  useEffect(() => {
    setToken(localStorage.getItem('poshcoder'))
  },[])

  return (
    <Routes>
      <Route path='/' element={<Navigate to={token ? 'admin/dashboard' : 'admin/login'} />} />
      <Route path='admin/login' element={token ? <Navigate to='admin/dashboard' /> : <Login />} />
      <Route element={token ? <Layout /> : <Login />}>
        <Route path='admin/dashboard' element={<Dashboard />} />
        <Route path='admin/users' element={<User />} />
        <Route path='admin/service/web' element={<WebDev/>} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
