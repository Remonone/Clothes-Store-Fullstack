import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

const Profile = () => {
  const navigation = useNavigate()
  const user = useAppSelector(state => state.accountReducer)
  const auth = useAppSelector(state => state.auth)
  useEffect(() => {
    if(auth.isAuthenticated) return
    navigation('/login')
  }, [user])
  return (
    <div>Profile</div>
  )
}

export default Profile