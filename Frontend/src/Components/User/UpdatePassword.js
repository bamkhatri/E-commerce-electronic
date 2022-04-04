import React, { Fragment, useEffect, useState } from 'react'
import './UpdatePassword.css'
import LockOpen from '@mui/icons-material/LockOpen'
import VpnKey from '@mui/icons-material/VpnKey'
import MetaData from '../Layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constant/userConstant'
import Loader from '../Layout/Loader/Loader'

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPasswordType, setOldPasswordType] = useState('password')
  const [newPasswordType, setNewPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, loading, isUpdated } = useSelector((state) => state.profile)

  const EyeNew = () => {
    if (newPasswordType === 'password') {
      setNewPasswordType('text')
    } else {
      setNewPasswordType('password')
    }
  }
  const EyeOld = () => {
    if (oldPasswordType === 'password') {
      setOldPasswordType('text')
    } else {
      setOldPasswordType('password')
    }
  }
  const EyeConfirm = () => {
    if (confirmPasswordType === 'password') {
      setConfirmPasswordType('text')
    } else {
      setConfirmPasswordType('password')
    }
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    }
    dispatch(updatePassword(data))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      toast.success('Profile Updated Successfully')
      dispatch(loadUser())

      navigate('/account')

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      })
    }
  }, [dispatch, error, toast, navigate, isUpdated])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Update Password' />
          <div className='UpdatePasswordContainer'>
            <div className='UpdatePasswordBox'>
              <h4>Change Password</h4>
              <form
                className='UpdatePasswordForm'
                encType='application/json'
                onSubmit={handlePasswordUpdate}
              >
                <div className='UpdatePasswordName'>
                  <VpnKey />
                  <input
                    type={oldPasswordType}
                    placeholder='Old Password'
                    required
                    name='oldPassword'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {oldPasswordType === 'password' ? (
                    <VisibilityOffIcon onClick={EyeOld} className='eyeIcon' />
                  ) : (
                    <VisibilityIcon onClick={EyeOld} className='eyeIcon' />
                  )}
                </div>
                <div className='UpdatePasswordName'>
                  <LockOpen />
                  <input
                    type={newPasswordType}
                    placeholder='New Password'
                    required
                    name='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {newPasswordType === 'password' ? (
                    <VisibilityOffIcon onClick={EyeNew} className='eyeIcon' />
                  ) : (
                    <VisibilityIcon onClick={EyeNew} className='eyeIcon' />
                  )}
                </div>
                <div className='UpdatePasswordEmail'>
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
                  value='Change '
                  className='UpdatePasswordBtn'
                  // disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  )
}

export default UpdatePassword
