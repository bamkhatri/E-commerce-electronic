import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Components/Layout/Header/Header'
import Webfront from 'webfontloader'
import { useEffect } from 'react'
import Footer from './Components/Layout/Footer/Footer'
import Home from './Components/Home/Home'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Products from './Components/Product/Products'

function App() {
  useEffect(() => {
    Webfront.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    })
  }, [])
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/read/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
