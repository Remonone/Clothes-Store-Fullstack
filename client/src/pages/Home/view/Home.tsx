import { Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PreviewCard from '../../../components/ProductCard/PreviewCard'
import { Product } from '../../../types/types'
import BestSellers from '../components/BestSellers'

import './Home.scss'

const Home = () => {
  const [promotionProducts, setPromotionProducts] = useState<Product[]>([])
  
  useEffect(()=> {
    axios.get('http://localhost:8000/api/v1/products').then(
      (response) => setPromotionProducts(response.data)
    )
  }, []) //TEMP
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
        {
          promotionProducts.length > 0 ? 
            <div className="main-preview">
              <Container>
                <div className='promotion'>
                  {
                    promotionProducts.map((item) => {
                      return (<PreviewCard key={item._id} product={item}/>)
                    })
                  }
                </div>
              </Container>
            </div>
          : <></>
        }
      </section>
      <section>
        <Container>
          <BestSellers/>
        </Container>
      </section>
      <section>
        <div className="performance">
          <Container>
            <div className="performance-wrapper">
              <div className="performance-info">
                <h2>Adidas Men Running Sneakers</h2>
                <p>Performance and design. Taken right to the edge.</p>
                <Link to='/'>Shop Now</Link>
              </div>
              <div className="performance-image">
                <img src={`${process.env.PUBLIC_URL}/sneakers.png`} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  )
}

export default Home