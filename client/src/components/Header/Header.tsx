import { Container, Grid } from '@mui/material'
import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { switchLanguage } from '../../redux/reducers/SettingsReducer'
import Button from '../Button/Button'
import Select from '../Select/Select'

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
              <Grid item md={3}>
                <Button variant='filled'>Test Button</Button>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className="header-lower"></div>
      </div>
    </header>
  )
}

export default Header