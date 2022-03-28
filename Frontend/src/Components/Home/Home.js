import React, { Fragment, useEffect } from 'react'
import { BsMouse2 } from 'react-icons/bs'
import './Home.css'
import ProductCard from './ProductCard'
import MetaData from '../Layout/MataData'
import { clearErrors, getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Layout/Loader/Loader'
import { toast } from 'react-toastify'

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
      })
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  }, [dispatch, error])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='Ecommerce' />
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
          <div className='container' id='container'>
            {products &&
              products.map((product) => (
                <Fragment key={product._id}>
                  <ProductCard product={product} />
                </Fragment>
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default Home
