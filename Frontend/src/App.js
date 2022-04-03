import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Layout/Header/Header'
import Webfront from 'webfontloader'
import { useEffect } from 'react'
import Footer from './Components/Layout/Footer/Footer'
import Home from './Components/Home/Home'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Search from './Components/Search/Search'
import Products from './Components/Product/Products'
import LoginSignup from './Components/User/LoginSignup'
import store from './store'
import { loadUser } from './actions/userAction'
import { useSelector } from 'react-redux'
import UserOptions from './Components/Layout/Header/UserOptions'
import Profile from './Components/User/Profile'
import ProtectedRoute from './Components/Route/ProtectedRoute'
import UpdateProfile from './Components/User/UpdateProfile'
import Orders from './Components/User/Orders'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user)

  useEffect(() => {
    Webfront.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    })
    store.dispatch(loadUser())
  }, [])
  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/read/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignup />} />
        {/* All Protected Routes comes below here */}
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/account' element={<Profile />} />
          <Route path='/me/update' element={<UpdateProfile />} />
          <Route path='/orders' element={<Orders />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
