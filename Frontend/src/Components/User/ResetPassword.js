import React, { Fragment, useEffect, useState } from 'react'
import './ResetPassword.css'
import LockOpen from '@mui/icons-material/LockOpen'
import MetaData from '../Layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { clearErrors, resetPassword } from '../../actions/userAction'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../Layout/Loader/Loader'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [newPasswordType, setNewPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()
  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  )

  const EyeNew = () => {
    if (newPasswordType === 'password') {
      setNewPasswordType('text')
    } else {
      setNewPasswordType('password')
    }
  }

  const EyeConfirm = () => {
    if (confirmPasswordType === 'password') {
      setConfirmPasswordType('text')
    } else {
      setConfirmPasswordType('password')
    }
  }

  const handlePasswordReset = (e) => {
    e.preventDefault()
    const myForm = new FormData()

    myForm.set('password', password)
    myForm.set('confirmPassword', confirmPassword)
    dispatch(resetPassword(token, myForm))
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (success) {
      toast.success(success)
      navigate('/login')
    }
  }, [dispatch, error, toast, navigate, success])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Reset Password' />
          <div className='ResetPasswordContainer'>
            <div className='ResetPasswordBox'>
              <h4>Resets Password</h4>
              <form
                className='ResetPasswordForm'
                onSubmit={handlePasswordReset}
              >
                <div className='ResetPasswordName'>
                  <LockOpen />
                  <input
                    type={newPasswordType}
                    placeholder='New Password'
                    required
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {newPasswordType === 'password' ? (
                    <VisibilityOffIcon onClick={EyeNew} className='eyeIcon' />
                  ) : (
                    <VisibilityIcon onClick={EyeNew} className='eyeIcon' />
                  )}
                </div>
                <div className='ResetPasswordEmail'>
                  <LockOpen />
                  <input
                    type={confirmPasswordType}
                    placeholder='Confirm Password'
                    required
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPasswordType === 'password' ? (
                    <VisibilityOffIcon
                      onClick={EyeConfirm}
                      className='eyeIcon'
                    />
                  ) : (
                    <VisibilityIcon onClick={EyeConfirm} className='eyeIcon' />
                  )}
                </div>
                <input
                  type='submit'
                  value='Update'
                  className='ResetPasswordBtn'
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

export default ResetPassword
