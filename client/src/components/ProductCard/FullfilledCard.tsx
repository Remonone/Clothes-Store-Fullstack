import { Rating } from '@mui/material'
import React, { useState } from 'react'
import { Product } from '../../types/types'
import { stringToColor } from '../../utils/colorGenerator'

const FullfilledCard = (props: {product: Product}) => {
    const discountPrice = props.product.price - (props.product.price / 100 * props.product.discount)
  return (
    <div>
        <div className="card-preview">
            <div className="card-tags">
                {
                    props.product.tags.map(item => {
                        return (<p style={{background: stringToColor(item)}}>{item}</p>)
                    })
                }
            </div>
            <div className="card-image">
                <img src={props.product.images[0]} alt="" />
            </div>
        </div>
        <div className="card-info">
            <p className="card__title">{props.product.name}</p>
            <Rating
                defaultValue={props.product.rating}
                precision={.5}
            />
            <div className="card-price">
                {
                    props.product.discount > 0 ?
                    <>
                        <p className="card-discount-price">${discountPrice}</p>
                        <p className="card-old-price">${props.product.price}</p>
                        <p className="card-discount">{props.product.discount}%</p>
                    </>
                    : 
                        <p className="card-price-usual">{props.product.price}</p>
                }
            </div>
        </div>
    </div>
  )
}

export default FullfilledCard