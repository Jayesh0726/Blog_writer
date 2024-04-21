import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.status);
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  
  return !loading ? (
    <div className='h-[100vh] w-[100vw] overflow-x-hidden bg-neutral-900'>
      <div className='w-full block'>
      {isAuthenticated && <Header />}
        <main>
         <Outlet />
        </main>
      </div>
    </div>
  ) : null
}

export default App
