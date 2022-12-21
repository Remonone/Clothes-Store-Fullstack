import React from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'

import './Search.scss'

const Search = () => {
  return (
    <div className='search'>
        <Input placeholder='Search query...' type={'text'}/>
        <Button variant={'filled'} >Search</Button>
    </div>
  )
}

export default Search