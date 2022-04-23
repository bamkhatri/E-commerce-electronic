import React, { Fragment, useEffect, useRef, useState } from 'react'
import './LoginSignup.css'
import Loader from '../Layout/Loader/Loader'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FaceIcon from '@mui/icons-material/Face'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { clearErrors, login, register } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const LoginSignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { loading, error, isAuthenticated } = useSelector((state) => state.user)

  const loginTab = useRef(null)
  const registerTab = useRef(null)
  const switcherTab = useRef(null)

  const [loginEmail, setLoginEmail] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/profile.png')
  const [avatar, setAvatar] = useState(null)
  const [loginPassword, setLoginPassword] = useState('')
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = values

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
  }

  const redirect = location.search ? location.search.split('=')[1] : '/account'

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (isAuthenticated) {
      navigate(redirect)
    }
  }, [error, isAuthenticated, navigate, dispatch, redirect])

  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail, loginPassword))
    console.log('Login submmitted')
  }

  const registerSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('password', password)
    myForm.set('avatar', avatar)
    dispatch(register(myForm))
  }

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shiftToNeutral')
      switcherTab.current.classList.remove('shiftToRight')

      registerTab.current.classList.remove('shiftToNeutralFrom')
      loginTab.current.classList.remove('shiftToLeft')
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('shiftToRight')
      switcherTab.current.classList.remove('shiftToNeutral')

      registerTab.current.classList.add('shiftToNeutralFrom')
      loginTab.current.classList.add('shiftToLeft')
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className='LoginSignupContainer'>
            <div className='LoginSignupBox'>
              <div>
                <div className='login_signUp_toggle'>
                  <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className='loginFrom' ref={loginTab} onSubmit={loginSubmit}>
                <div className='loginEmail'>
                  <EmailOutlinedIcon />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className='loginPassword'>
                  <LockOpenOutlinedIcon />
                  <input
                    type='password'
                    placeholder='Password'
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to='/password/forgot'>Forget Password</Link>
                <input type='submit' value='Login' className='loginBtn' />
              </form>
              <form
                className='signupForm'
                ref={registerTab}
                encType='multipart/form-data'
                onSubmit={registerSubmit}
              >
                <div className='signupName'>
                  <FaceIcon />
                  <input
                    type='text'
                    placeholder='Full Name'
                    required
                    name='name'
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <div className='signupEmail'>
                  <EmailOutlinedIcon />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className='signupPassword'>
                  <LockOpenOutlinedIcon />
                  <input
                    type='password'
                    placeholder='Password'
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div id='registerImage'>
                  <img src={avatarPreview} alt='Avatar Preview' />
                  <input
                    type='file'
                    name='avatar'
                    accept='image/'
                    onChange={handleChange}
                  />
                </div>
                <input
                  type='submit'
                  value='Register'
                  className='signupBtn'
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  )
}

export default LoginSignup
