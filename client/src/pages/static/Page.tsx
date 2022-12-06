import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Page = (props: {element: React.ReactElement}) => {
  return (
    <div>
        <Header/>
        {props.element}
        <Footer/>
    </div>
  )
}

export default Page