import React, { useEffect, useState } from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import "./Select.scss"

const Select = (props: {label?: string, values: string[], onChangeAction: CallableFunction }) => {
    const [value, setValue] = useState(props.label ? '' : props.values[0])
    const changeValue = (val: string) => {
        setValue(val)
    }
    useEffect(()=> {
        props.onChangeAction(value)
    }, [value, props])
  return (
    <div className='select'>
        <div className="select-visible">{
            props.label ? (<span>{props.label}</span>) : (<span>{value}</span>)
        }
        <ArrowDropDownOutlinedIcon/>
        </div>
        <div className="select-hidden">
            {props.values.map(item => {
                if(item === value) return (<></>)
                return (<span onClick={() => changeValue(item)} className='select-item' key={item}>{item}</span>)
            })}
        </div>
    </div>
  )
}

export default Select