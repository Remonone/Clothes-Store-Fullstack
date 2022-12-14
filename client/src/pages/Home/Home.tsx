import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
const Home = () => {
  const user = useAppSelector(state => state.accountReducer)

  return (
    <div>
        {
          user ? (
            <>
              <img src={user.avatar} alt="" />
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </>
          ) : (<></>)
        }
      </div>
  )
}

export default Home