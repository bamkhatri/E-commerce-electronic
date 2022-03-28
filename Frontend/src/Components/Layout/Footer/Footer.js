import React from 'react'
import appStore from '../../../image/Appstore.png'
import playstore from '../../../image/playstore.png'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='leftFooter'>
        <h4>Download Our App</h4>
        <p>Download App for Android and IOS Mobile Phone</p>
        <img src={appStore} alt='appStore' />
        <img src={playstore} alt='' />
      </div>
      <div className='middleFooter'>
        <h1>Ecommerce</h1>
        <p>High Quality is our first pripority</p>
        <p>Copyrights 2022 &copy; BamKhatri</p>
      </div>
      <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href='https://www.facebook.com/bam.khatri.90/'>Facebook</a>
        <a href='https://www.instagram.com/khatribam/?hl=en'>Instagram</a>
      </div>
    </div>
  )
}

export default Footer
