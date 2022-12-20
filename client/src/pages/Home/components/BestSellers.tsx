import { Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import FullfilledCard from '../../../components/ProductCard/FullfilledCard'
import { Product } from '../../../types/types'

const BestSellers = () => {
    //TODO: create category list in backend
    type Category = 'all' | 'bags' | 'sneakers' | 'belt' | 'sunglasses' // TEMP
    
    const [bestProducts, setBestProducts] = useState<Product[]>([])
    const [category, setCategory] = useState<Category>('all')
    const [count, setCount] = useState(1)

    // TODO: create redux reducer of best Products
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/v1/products${category === 'all' ? '' : '/' + category}?limit=${count * 8}`).then(response => setBestProducts(response.data))
    }) // TEMP
    return (
        <div className="best-products">
                <h2>Best Sellers</h2>
                <nav>
                    <Button variant='empty' onClick={()=> setCategory('all')}>All</Button>
                    <Button variant='empty' onClick={()=> setCategory('bags')}>Bags</Button>
                    <Button variant='empty' onClick={()=> setCategory('sneakers')}>Sneakers</Button>
                    <Button variant='empty' onClick={()=> setCategory('belt')}>Belt</Button>
                    <Button variant='empty' onClick={()=> setCategory('sunglasses')}>Sunglasses</Button>
                </nav>
                {
                bestProducts ?
                    <div className='bestProducts'>
                        {
                            bestProducts.map(product => (
                            <FullfilledCard product={product}/>))
                        }
                    </div> 
                : <></>
                }
                <div className="best-products-link">
                    <Button variant='empty' onClick={()=> setCount(prev=> prev+1)}>Load More</Button>
                </div>
        </div>
    )
}

export default BestSellers