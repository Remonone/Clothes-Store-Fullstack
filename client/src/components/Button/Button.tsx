import React, { forwardRef } from 'react'

import './Button.scss'

interface IButton{
    children?: any
    variant: "filled" | "empty"
    disable?: boolean
    onClick?: CallableFunction
    preIcon?: React.ReactNode
    postIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, IButton>(({children, variant, onClick, disable, preIcon, postIcon}: IButton, ref) => {
  return (
    <button ref={ref} disabled={disable} onClick={() =>onClick && onClick()} className={`btn btn-${variant}`}>{preIcon}{children}{postIcon}</button>
  )
})

export default Button