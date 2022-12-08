import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Page = (props: {element: React.ReactElement}) => {
  return (
    <div className={'page'}>
        <Header/>
        <main>
          {props.element}
        </main>
        <Footer/>
    </div>
  )
}

export default Page