import { Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PreviewCard from '../../../components/ProductCard/PreviewCard'
import Search from '../../../components/Search/Search'
import { Product } from '../../../types/types'
import BestSellers from '../components/BestSellers'
import Featured from '../components/Featured'

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
      <section>
        <div className="advantages">
          <Container>
            <div className="advantages-wrapper">
              <div className="advantages-item">
                <div className="advantages-image">
                  <img src={`${process.env.PUBLIC_URL}/shipping.svg`} alt="" />
                </div>
                <h2 className="advantages__title">FREE SHIPPING</h2>
                <p className="advantages__descr">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="advantages-item">
                <div className="advantages-image">
                  <img src={`${process.env.PUBLIC_URL}/refund.svg`} alt="" />
                </div>
                <h2 className="advantages__title">100% REFUND</h2>
                <p className="advantages__descr">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="advantages-item">
                <div className="advantages-image">
                  <img src={`${process.env.PUBLIC_URL}/support.svg`} alt="" />
                </div>
                <h2 className="advantages__title">SUPPORT 24/7</h2>
                <p className="advantages__descr">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <section>
        <Container>
          <Featured/>
        </Container>
      </section>
      <section>
        <Container>
          <Search/>
        </Container>
      </section>
    </>
  )
}

export default Home