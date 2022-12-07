import React, { forwardRef } from 'react'

import './Button.scss'

interface IButton{
    children?: any
    variant: "filled" | "empty"
    disable?: boolean
    onClick?: CallableFunction
}

const Button = forwardRef<HTMLButtonElement, IButton>(({children, variant, onClick, disable}: IButton, ref) => {
  return (
    <button ref={ref} disabled={disable} onClick={() =>onClick && onClick()} className={`btn btn-${variant}`}>{children}</button>
  )
})

export default Button