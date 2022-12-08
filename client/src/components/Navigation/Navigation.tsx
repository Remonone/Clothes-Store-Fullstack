import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { links } from '../../utils/consts'

import './Navigation.scss'

const Navigation = () => {
    const location = useLocation()
  return (
    <div>
        <nav className={'navigation'}>
            <ul>
                {
                    links.map(item => {
                        let className = ''
                        if(item.path === location.pathname) className='active'
                        return (<li key={`${item.id}`}><Link className={className} to={item.path}>{item.value}</Link></li>)
                    })
                }
            </ul>
        </nav>
    </div>
  )
}

export default Navigation