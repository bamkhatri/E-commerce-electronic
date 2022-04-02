import React, { useEffect } from 'react'
import MetaData from '../Layout/MataData'
import './Profile.css'

import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Layout/Loader/Loader'

const Profile = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login')
    }
  }, [navigate, isAuthenticated])

  console.log(user)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MetaData title={`${user.name}'s Profile`} />
            <div className='profileContainer'>
              <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name} />
                <Link to='me/update'>Edit Profile</Link>
              </div>
              <div>
                <div className='profileDetail'>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div className='profileDetail'>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div className='profileDetail'>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substring(0, 10)}</p>
                </div>
                <div className='profileLink'>
                  <Link to='/orders'>My Orders</Link>
                  <Link to='/password/update'>Change Password</Link>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  )
}

export default Profile
