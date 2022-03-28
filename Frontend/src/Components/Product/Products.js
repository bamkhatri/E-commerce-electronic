import React, { Fragment, useEffect } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../Layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
const Products = () => {
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className='productHeadings'>Products</h2>
          <div className='products'>
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </Fragment>
  )
}

export default Products
