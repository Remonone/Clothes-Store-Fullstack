import React, { useEffect, useState } from 'react'
const Home = () => {
  const [user, setUser] = useState<any>()
  
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