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

const Header = () => {
  const dispatcher = useAppDispatch()
  const changeLanguage = (language: string) => dispatcher(switchLanguage(language))
  const changeCurrency = (currency: string) => dispatcher(switchLanguage(currency))
  return (
    <header>
      <div className="header">
        <div className="header-upper">
          <Container>
            <Grid container pt={2} pb={1} display='flex' alignItems='center' justifyContent='space-between'>
              <Grid item md={2} display='flex' justifyContent='flex-start' gap={1} alignItems={'flex-start'}>
                <Select values={['EN', 'RU', 'UA']} onChangeAction={changeLanguage}/>
                <Select values={['USD', 'EUR']} onChangeAction={changeCurrency}/>
              </Grid>
              <Grid item md={4} display='flex' gap={4}>
                <Button variant='empty' preIcon={<PermIdentityOutlinedIcon/>}>My Profile</Button>
                <CartIcon/>
                <Button variant="empty"><SearchOutlinedIcon/></Button>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className="header-lower">
          <Container>
            <Grid container py={2}>
              <Grid item md={2} className='logo' display='flex' alignItems='center' gap={1}>
                <img src={process.env.PUBLIC_URL + '/Icon.svg'} alt="" />
                <p className='logo-text'>E-Comm</p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </header>
  )
}

export default Header