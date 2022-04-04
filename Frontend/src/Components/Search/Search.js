import React, { useState } from 'react'
import './Search.css'
import MetaData from '../Layout/MetaData'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const history = useNavigate()
  const [keyword, setKeyword] = useState('')

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history(`/products/${keyword}`)
    } else {
      history('/products')
    }
  }
  return (
    <>
      <MetaData title='Search a Product -- Ecommerce' />
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Search a Product ...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className='searchButton'>Search</button>
      </form>
    </>
  )
}

export default Search
