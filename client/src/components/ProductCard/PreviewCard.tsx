import React, { useEffect } from 'react'
import { Product } from '../../types/types'

import './ProductCard.scss'

const PreviewCard = (props: {product: Product}) => {
    const currentPrice = props.product.price - 
    (props.product.discount > 0 ?
    (props.product.price / 100 * props.product.discount) : 0)
    return (
        <div className='preview'>
            <div className="card-image">
                <img src={props.product.images[0]} alt="" />
            </div>
            <div className="card-info">
                <p className="card__title">{props.product.name}</p> 
                <p className="card-current-price">${currentPrice}</p> 
                {
                    props.product.discount > 0 ?
                        <div className="card-old">
                            <p className="card-old-price">${props.product.price}</p>
                            <p className="card-discount">{props.product.discount}%</p>
                        </div>  
                    : 
                        <></>
                }
            </div>
        </div>
    )
}

export default PreviewCard