import React, { Fragment, useState } from 'react'
import './UserOptions.css'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../actions/userAction'
import { toast } from 'react-toastify'
import profile from '../../../image/profile.png'

const UserOptions = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
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
            key={item.icon}
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
