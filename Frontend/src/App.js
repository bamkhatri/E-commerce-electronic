import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Components/Layout/Header/Header'
import Webfront from 'webfontloader'
import { useEffect } from 'react'
import Footer from './Components/Layout/Footer/Footer'
import Home from './Components/Home/Home'

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
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
