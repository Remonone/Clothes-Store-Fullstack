import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../../utils/consts'

const Navigation = () => {

  return (
    <div>
        <nav>
            <ul>
                {
                    links.map(item => {
                        return (<Link to={item.path}>{item.value}</Link>)
                    })
                }
            </ul>
        </nav>
    </div>
  )
}

export default Navigation