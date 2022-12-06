import { Container, Grid } from '@mui/material'
import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { switchLanguage } from '../../redux/reducers/SettingsReducer'
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
            <Grid>
              <Grid item md={1}>
                <Select values={['EN', 'RU', 'UA']} onChangeAction={changeLanguage}/>
              </Grid>
              <Grid item md={3}>
                <Select values={['USD', 'EUR']} onChangeAction={changeCurrency}/>
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