import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCard.css'

const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <div className='CartItemCard'>
      <img src={item.image} alt='sas' />
      <div>
        <Link to={`/read/${item.product}`}>{item.name}</Link>
        <span>{`Price: Rs${item.price}`}</span>
        <p onClick={() => deleteCartItem(item.product)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard
