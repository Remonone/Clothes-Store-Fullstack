import React, { forwardRef, InputHTMLAttributes } from 'react'

import './Input.scss'

interface InputParams extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password' | 'number' | 'date' | 'file'
    preIcon?: React.ReactNode
    postIcon?: React.ReactNode
    placeholder?: string
    isError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputParams>(({preIcon, postIcon, placeholder, type, isError, ...rest}: InputParams, ref) => {
  return (
    <label htmlFor={type+placeholder} className={`input-box${isError ? ' error' : ''}`}>
        {preIcon || <></>}
        <input ref={ref} type={type} id={type+placeholder} placeholder={placeholder} {...rest}/>
        {postIcon || <></>}
    </label>
  )
})

export default Input