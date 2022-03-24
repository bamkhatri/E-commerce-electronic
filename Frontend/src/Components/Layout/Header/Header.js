import React, { useState } from 'react'
import { ReactNavbar } from 'overlay-navbar'
import logo from '../../../image/logo.png'
import profile from '../../../image/profile.png'
import './Header.css'
import { Link } from 'react-router-dom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuIcon from '@mui/icons-material/Menu'
const Header = () => {
  const [show, setShow] = useState(false)
  console.log(show, 'show')
  return (
    // <ReactNavbar
    //   burgerColorHover='#eb4034'
    //   logo={logo}
    //   logoWidth='20vmax'
    //   navColor1='white'
    //   logoHoverSize='10px'
    //   logoHoverColor='#eb4034'
    //   link1Text='Home'
    //   link2Text='Products'
    //   link3Text='Contact'
    //   link4Text='About'
    //   link1Url='/'
    //   link2Url='/products'
    //   link3Url='/contact'
    //   link4Url='/about'
    //   link1Size='1.3vmax'
    //   link1Color='rgba(35, 35, 35,0.8)'
    //   nav1justifyContent='flex-end'
    //   nav2justifyContent='flex-end'
    //   nav3justifyContent='flex-start'
    //   nav4justifyContent='flex-start'
    //   link1ColorHover='#eb4034'
    //   link1Margin='1vmax'
    //   profileIconUrl='/login'
    //   profileIconColor='rgba(35, 35, 35,0.8)'
    //   searchIconColor='rgba(35, 35, 35,0.8)'
    //   cartIconColor='rgba(35, 35, 35,0.8)'
    //   profileIconColorHover='#eb4034'
    //   searchIconColorHover='#eb4034'
    //   cartIconColorHover='#eb4034'
    //   cartIconMargin='1vmax'
    // />

    <div className={show ? 'mobileView' : 'navContainer'}>
      <div className='navbarLeft'>
        <Link className='logoLink' to='/'>
          <img src={logo} alt='' />
        </Link>
      </div>
      <div className='navbarMiddle'>
        <Link className='itemLinks' to='/'>
          <span>Home</span>
        </Link>
        <Link className='itemLinks' to='/products'>
          <span>Product</span>
        </Link>
        <Link className='itemLinks' to='/about'>
          <span>About Us</span>
        </Link>
        <Link className='itemLinks' to='/contact'>
          <span>Contact Us</span>
        </Link>
      </div>
      <div className={show ? 'mobileList' : 'hello'}>
        <Link className='itemLinks' to='/'>
          <span>Home</span>
        </Link>
        <Link className='itemLinks' to='/products'>
          <span>Product</span>
        </Link>
        <Link className='itemLinks' to='/about'>
          <span>About Us</span>
        </Link>
        <Link className='itemLinks' to='/contact'>
          <span>Contact Us</span>
        </Link>
        <Link className='itemLinks' to='/search'>
          <span>Search</span>
        </Link>
        <Link className='itemLinks' to='/cart'>
          <span>Cart</span>
        </Link>
        <Link className='itemLinks' to='/login'>
          <span>Log In</span>
        </Link>
      </div>
      <div className='navbarRight'>
        <Link className='iconLinks' to='/search'>
          <SearchOutlinedIcon />
        </Link>
        <Link className='iconLinks' to='/cart'>
          <ShoppingCartOutlinedIcon />
        </Link>
        <Link className='iconLinks' to='/login'>
          <img src={profile} alt='' />
        </Link>
      </div>
      <div className='burger' onClick={() => setShow(!show)}>
        {/* {show ? (
          <i className='bx bx-minus'></i>
        ) : (
          <i className='bx bx-menu'></i>
        )} */}
        <i className='bx bx-menu'></i>
      </div>
    </div>
  )
}

export default Header
