import { Container, Grid } from '@mui/material'
import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <Container>
          <Grid container spacing={5}>
            <Grid item md={4}>
              <div className="logo">
                <img src={process.env.PUBLIC_URL + '/Icon.svg'} alt="" />
                <p className='logo-text'>E-Comm</p>
              </div>
              <p className='footer__descr'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.</p>
            </Grid>
            <Grid item md={4}>
              <p className='footer__title'>Follow Us</p>
              <p className='footer__descr'>Since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
              <ul className="footer-social">
                <li><a href="https://www.facebook.com"><FacebookOutlinedIcon sx={{color:'#385C8E'}}/></a></li>
                <li><a href="https://www.twitter.com"><TwitterIcon sx={{color:'#03A9F4'}}/></a></li>
              </ul>
            </Grid>
            <Grid item md={4}>
              <p className='footer__title'>Contact Us</p>
              <p className='footer__descr'>E-Comm, 4578<br/> Marmora Road,<br/> Glasgow D04 89GR</p>
            </Grid>
          </Grid>
          <div className="footer-lower">
            <p className='light'>© 2018 Ecommerce theme by www.bisenbaev.com</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer