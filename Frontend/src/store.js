import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productsDetailsReducer,
  productsReducer,
} from './reducers/productReducer'
import {
  profileImageReducer,
  profileReducer,
  userReducer,
} from './reducers/userReducer'
const reducer = combineReducers({
  products: productsReducer,
  productDetail: productsDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  profileImage: profileImageReducer,
})

let initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
