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
const BaseLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  useEffect(() => {
    Webfront.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    })
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
          path='/search'
          element={
            <BaseLayout>
              <Search />
            </BaseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
