import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard'
import Loader from '../Layout/Loader/Loader'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  )

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
      })
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id))
  }, [dispatch, error])

  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='ProductDetails'>
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className='CarouselImage'
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className='detailsBlock-3'>
                <h1>{`Rs: ${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button>-</button>
                    <input type='number' value='1' onChange={() => {}} />
                    <button>+</button>
                  </div>
                  <button>Add To Cart</button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.stock < 1 ? ' OutOfStock' : ' InStock'}
                  </b>
                </p>
              </div>
              <div className='detailsBlock-4'>
                Description:
                <p> {product.description}</p>
              </div>
              <button className='submitReview'> Submit Review</button>
            </div>
          </div>
          <h3 className='reviewsHeading'>Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews.map((review) => (
                <ReviewCard review={review} key={review._id} />
              ))}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}
        </>
      )}
    </>
  )
}

export default ProductDetails
