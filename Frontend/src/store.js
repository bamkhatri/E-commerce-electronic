import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productsDetailsReducer,
  productsReducer,
} from './reducers/productReducer'
import {
  forgotPasswordReducer,
  profileImageReducer,
  profileReducer,
  userReducer,
} from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
const reducer = combineReducers({
  products: productsReducer,
  productDetail: productsDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  profileImage: profileImageReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
})

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
