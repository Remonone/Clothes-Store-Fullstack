import React, { useState } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '../Button/Button';

import './CartIcon.scss'
const CartIcon = () => {
    const [itemsInCart, setItemsInCart] = useState(1)
  return (
    <div className='cartIcon'>
        <Button 
        variant="empty" 
        preIcon={<ShoppingCartOutlinedIcon/>}
        >
            {itemsInCart > 0 ?
                <div className="cartIcon-items">
                    {itemsInCart}
                </div> : <></>
            }
        </Button>
        <span className="light">$0.00</span>
    </div>
  )
}

export default CartIcon