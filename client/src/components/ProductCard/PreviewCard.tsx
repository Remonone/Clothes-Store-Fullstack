import React from 'react'
import { Product } from '../../types/types'

import './ProductCard.scss'

const PreviewCard = (props: {product: Product}) => {
    const discountPrice = props.product.price - (props.product.price / 100 * props.product.discount)
    return (
        <div className='preview'>
            <div className="card-image">
                <img src={props.product.images[0]} alt="" />
            </div>
            <div className="card-info">
                <p className="card__title">{props.product.name}</p>  
                {
                    props.product.discount > 0 ?
                    <>
                        <p className="card-current-price">${discountPrice}</p>
                        <div className="card-old">
                            <p className="card-old-price">${props.product.price}</p>
                            <p className="card-discount">{props.product.discount}%</p>
                        </div>
                    </>    
                    : 
                        <p className="card-current-price">${props.product.price}</p>
                }
            </div>
        </div>
    )
}

export default PreviewCard