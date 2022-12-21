import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MiniCard from '../../../components/ProductCard/MiniCard'
import { Product } from '../../../types/types'

const Featured = () => {
    const [featured, setFeatured] = useState<Product[]>([]) //TEMP
    useEffect(()=> {
        axios.get('http://localhost:8000/api/v1/products').then(response => setFeatured(response.data))
    }, [])
    return (
    <div className='featured'>
        <h2>Featured Products</h2>
        <div className="featured-list">
            {
                featured ? 
                <>
                    {featured.map(item => (<MiniCard product={item}/>))}
                </> 
                : 
                <></>
            }
        </div>
    </div>
  )
}

export default Featured