import React, { Fragment, useEffect, useState } from 'react'
import './ForgotPassword.css'
import Loader from '../Layout/Loader/Loader'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { clearErrors, forgotPassword } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import MetaData from '../Layout/MetaData'
const ForgotPassword = () => {
  const dispatch = useDispatch()

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  )
  const [email, setEmail] = useState('')

  const forgotPasswordSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('email', email)
    dispatch(forgotPassword(myForm))
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (message) {
      toast.success(message)
    }
  }, [message, error, toast])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Forgot Password' />
          <div className='ForgotPasswordContainer'>
            <div className='ForgotPasswordBox'>
              <h4>Forgot Password</h4>
              <form
                className='ForgotPasswordForm'
                onSubmit={forgotPasswordSubmit}
              >
                <div className='ForgotPasswordEmail'>
                  <EmailOutlinedIcon />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  value='Send'
                  className='ForgotPasswordBtn'
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

export default ForgotPassword
