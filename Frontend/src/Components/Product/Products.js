import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import { toast } from 'react-toastify'
import Loader from '../Layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@mui/material/Slider'
import { Typography } from '@mui/material'
import MetaData from '../Layout/MetaData'

const categories = [
  'Laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Camera',
  'Smartphones',
  'Watch',
]

const Products = () => {
  const { keyword } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 200000])
  const [category, setCategory] = useState('')
  const [ratings, setRatings] = useState(0)

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
    if (error) {
      toast.error(error, {
        position: 'top-right',
      })
      dispatch(clearErrors())
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  }, [dispatch, keyword, currentPage, price, category, ratings])
  let count = filteredProductsCount
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='PRODUCTS -- ECOMMERCE' />
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

            <Typography>Categories</Typography>
            <ul className='categoryBox'>
              {categories.map((category) => (
                <li
                  className='category-link'
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component='legend'>Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newValue) => setRatings(newValue)}
                valueLabelDisplay='auto'
                aria-labelledby='continuous-slider'
                min={0}
                max={5}
              ></Slider>
            </fieldset>
          </div>

          {resultPerPage < count && (
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
