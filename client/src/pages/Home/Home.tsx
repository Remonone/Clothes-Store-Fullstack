import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
const Home = () => {
  const user = useAppSelector(state => state.accountReducer)

  return (
    <>
      <section>
        <div className="main">
          <div className="image">
            <img src={`${process.env.PUBLIC_URL}/promotion.png`} alt="" />
          </div>
          <div className="information">
            <p>Super Flash Sale 50% Off</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home