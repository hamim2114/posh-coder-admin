import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('admin'))

  useEffect(() => {
    const storedUser = localStorage.getItem('admin')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('admin', JSON.stringify(user))
    } else {
      localStorage.removeItem('admin')
    }
  }, [user])



  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider