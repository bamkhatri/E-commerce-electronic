import React, { Fragment, useState } from 'react'
import './UserOptions.css'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../actions/userAction'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { toast } from 'react-toastify'
import profile from '../../../image/profile.png'

const UserOptions = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [open, setOpen] = useState(false)

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
        />
      ),
      name: `Cart(${cartItems.length}) `,
      func: cart,
    },
    { icon: <LogoutIcon />, name: 'Logout', func: logoutUser },
  ]
  if (user.role === 'admin') {
    options.unshift({
      icon: <GridViewOutlinedIcon />,
      name: 'Dashboard',
      func: dashboard,
    })
  }
  function dashboard() {
    navigate('/dashboard')
  }
  function logoutUser() {
    dispatch(logout())
    toast.success('Logout Successfully !', {
      position: 'top-right',
    })
  }
  function orders() {
    navigate('/orders')
  }
  function account() {
    navigate('/account')
  }
  function cart() {
    navigate('/cart')
  }
  return (
    <Fragment>
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        className='speedDial'
        icon={
          <img
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url : profile}
            alt='Profile'
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            key={item.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
