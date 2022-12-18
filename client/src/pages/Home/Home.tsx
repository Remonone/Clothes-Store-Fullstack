import { Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PreviewCard from '../../components/ProductCard/PreviewCard'
import { useAppSelector } from '../../redux/hooks'
import { Product } from '../../types/types'

import './Home.scss'

const Home = () => {
  const [promotionProducts, setPromotionProducts] = useState<Product[]>([])

  useEffect(()=> {
    axios.get('http://localhost:8000/api/v1/products/639f768996507d8ac3fbef03').then(
      (response) => setPromotionProducts([response.data])
    )
  }, [])
  return (
    <>
      <section>
        <div className="main">
          <div className="image">
            <img src={`${process.env.PUBLIC_URL}/promote.png`} alt="" />
          </div>
          <div className="information">
            <Container>
              <p>Super Flash Sale 50% Off</p>
            </Container>
          </div>
        </div>
        <div className="main-preview">
          <Container>
            {
              promotionProducts.length > 0 ? 
              <div className='promotion'>
                {
                  promotionProducts.map((item) => {
                    return (<PreviewCard product={item}/>)
                  })
                }
              </div> : <></>
            }
          </Container>
        </div>
      </section>
    </>
  )
}

export default Home