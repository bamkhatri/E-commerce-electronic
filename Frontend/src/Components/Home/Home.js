import React from 'react'
import { BsMouse2 } from 'react-icons/bs'
import './Home.css'
const Home = () => {
  return (
    <>
      <div className='banner'>
        <p>Welcome To E-commerce</p>
        <h1>Find Amazing Products Below</h1>
        <a href='#container'>
          <button>
            Scroll <BsMouse2 />
          </button>
        </a>
      </div>
      <h2 className='homeHeading'>Featured Products</h2>
      <div className='container'>product will be here</div>
    </>
  )
}

export default Home
