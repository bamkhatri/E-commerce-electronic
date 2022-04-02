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
        <Route path='/account' element={<Search />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
