import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../Layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@mui/material/Slider'
import { Typography } from '@mui/material'

const Products = () => {
  const { keyword } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 200000])

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products)
  const dispatch = useDispatch()

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice)
  }

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price))
  }, [dispatch, keyword, currentPage, price])
  let count = filteredProductsCount
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
          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={200000}
            ></Slider>
          </div>
          {resultPerPage < filteredProductsCount && (
            <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='First'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            </div>
          )}
        </>
      )}
    </Fragment>
  )
}

export default Products
