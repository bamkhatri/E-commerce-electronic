import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profile from '../../image/profile.png'

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  }
  return (
    <div className='reviewCard'>
      <img src={profile} alt='User' />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
