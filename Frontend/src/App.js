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
  const BaseLayout = ({ children }) => {
    return (
      <div>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
  const SearchLayout = ({ children }) => {
    return (
      <div>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <main>{children}</main>
      </div>
    )
  }
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
      <Routes>
        <Route
          exact
          path='/'
          element={
            <BaseLayout>
              <Home />
            </BaseLayout>
          }
        />
        <Route
          path='/read/:id'
          element={
            <BaseLayout>
              <ProductDetails />
            </BaseLayout>
          }
        />
        <Route
          exact
          path='/products'
          element={
            <BaseLayout>
              <Products />
            </BaseLayout>
          }
        />
        <Route
          path='/products/:keyword'
          element={
            <BaseLayout>
              <Products />
            </BaseLayout>
          }
        />

        <Route
          path='/account'
          element={
            <SearchLayout>
              <Search />
            </SearchLayout>
          }
        />
        <Route
          path='/search'
          element={
            <SearchLayout>
              <Search />
            </SearchLayout>
          }
        />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
