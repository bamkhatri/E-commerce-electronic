import React, { Fragment, useEffect, useState } from 'react'
import './UpdateProfile.css'
import Loader from '../Layout/Loader/Loader'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FaceIcon from '@mui/icons-material/Face'
import { useNavigate } from 'react-router-dom'
import {
  clearErrors,
  loadUser,
  updateProfile,
  updateProfileImage,
} from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { UPDATE_PROFILE_RESET } from '../../constant/userConstant'
import MetaData from '../Layout/MetaData'

const UpdateProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { error, isUpdated, loading } = useSelector((state) => state.profile)
  const { errors, isUpdateds, loadings } = useSelector(
    (state) => state.profileImage
  )

  console.log(loadings, ';lsdfklnsdjkfhjk')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('/profile.png')

  const handleChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      toast.success('Profile Updated Successfully')
      dispatch(loadUser())
      navigate('/account')

      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, error, toast, navigate, user, isUpdated])
  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar.url)
    }

    if (errors) {
      toast.error(errors)
      dispatch(clearErrors())
    }

    if (isUpdateds) {
      toast.success('Profile Updated Successfully')
      dispatch(loadUser())

      navigate('/account')

      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, errors, isUpdateds, toast, navigate, user])

  const updateProfileSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('name', name)
    myForm.set('email', email)
    // myForm.set('avatar', avatar)
    dispatch(updateProfile(myForm))
  }
  const updateProfileImages = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set('avatar', avatar)
    dispatch(updateProfileImage(myForm))
  }
  return (
    <>
      {loading || loadings ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Update Profile' />
          <div className='UpdateProfileContainer'>
            <div className='UpdateProfileBox'>
              <h4>Update Profile</h4>
              <form
                className='UpdateProfileForm'
                encType='multipart/form-data'
                onSubmit={updateProfileSubmit}
              >
                <div className='UpdateProfileName'>
                  <FaceIcon />
                  <input
                    type='text'
                    placeholder='Full Name'
                    required
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='UpdateProfileEmail'>
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

                <div
                  id='UpdateProfileImage'
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <img src={avatarPreview} alt='Avatar Preview' />
                  <input
                    type='file'
                    name='avatar'
                    accept='image/'
                    onChange={handleChange}
                  />
                  <button
                    className='UpdateProfileBtn'
                    style={{ margin: '2vmax' }}
                    onClick={updateProfileImages}
                  >
                    To Update Image
                  </button>
                </div>
                <input
                  type='submit'
                  value='Update'
                  className='UpdateProfileBtn'
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

export default UpdateProfile
