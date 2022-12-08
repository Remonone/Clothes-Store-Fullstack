import { Container, Grid } from '@mui/material'
import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { switchLanguage } from '../../redux/reducers/SettingsReducer'
import Button from '../Button/Button'
import Select from '../Select/Select'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CartIcon from '../CartIcon/CartIcon'

import './Header.scss'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'

const Header = () => {
  const dispatcher = useAppDispatch()
  const changeLanguage = (language: string) => dispatcher(switchLanguage(language))
  const changeCurrency = (currency: string) => dispatcher(switchLanguage(currency))
  return (
    <header>
      <div className="header">
        <div className="header-upper">
          <Container maxWidth="lg">
            <Grid container pt={2} pb={1} display='flex' alignItems='center' justifyContent='space-between'>
              <div className='header-upper-selections'>
                <Select values={['EN', 'RU', 'UA']} onChangeAction={changeLanguage}/>
                <Select values={['USD', 'EUR']} onChangeAction={changeCurrency}/>
              </div>
              <div className='header-upper-control'>
                <Button variant='empty' preIcon={<PermIdentityOutlinedIcon/>}>My Profile</Button>
                <CartIcon/>
                <Button variant="empty"><SearchOutlinedIcon/></Button>
              </div>
            </Grid>
          </Container>
        </div>
        <div className="header-lower">
          <Container>
            <Grid className="header-lower-wrapper">
              <div className='logo'>
                <img src={process.env.PUBLIC_URL + '/Icon.svg'} alt="" />
                <p className='logo-text'>E-Comm</p>
              </div>
              <Navigation/>
            </Grid>
          </Container>
        </div>
      </div>
    </header>
  )
}

export default Header