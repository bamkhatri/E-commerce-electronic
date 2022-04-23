import React from 'react'
import './Cart.css'
import { addItemsToCart, removeFromCart } from '../../actions/cartAction'
import CartItemCard from './CartItemCard'
import { useSelector, useDispatch } from 'react-redux'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1
    if (stock <= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newQty))
  }
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1
    if (1 >= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newQty))
  }
  const deleteItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=shipping')
  }
  return (
    <>
      {cartItems.length === 0 ? (
        <div className='emptyCart'>
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to='/products'>View Products</Link>
        </div>
      ) : (
        <>
          <MetaData title={`User Cart`} />
          <div className='cartPage'>
            <div className='cartHeader'>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className='cartContainer' key={item.product}>
                  <CartItemCard item={item} deleteCartItem={deleteItem} />
                  <div className='cartInput'>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type='number' value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className='cartSubtotal'>{`₹${item.price *
                    item.quantity}`}</p>
                </div>
              ))}

            <div className='cartGrossProfit'>
              <div></div>
              <div className='cartGrossProfitBox'>
                <p>Gross Total</p>
                <p>{`Rs${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className='checkoutBtn'>
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Cart
