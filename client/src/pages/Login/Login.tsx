import { Container, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Input from '../../components/Input/Input'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { yupResolver } from '@hookform/resolvers/yup'


import './Login.scss'
import Button from '../../components/Button/Button'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../schema/schemas'
import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/reducers/AuthReducer'

interface ILoginCredentials{
    email: string
    password: string
}


const Login = () => {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<React.ReactNode>(<></>)
    const dispatch = useAppDispatch()
    const submit = (data: ILoginCredentials) => {
        dispatch(login(data))
    }
    const {register, handleSubmit, formState: { errors }} = useForm<ILoginCredentials>({
        resolver: yupResolver(loginSchema)
    })
    
    useEffect(() => {
        let errorLog: React.ReactNode = <div>
            {Object.values(errors).map(item => {
                return (<p>{item.message}</p>)
            })}
        </div>
        
        if(!(errors.email || errors.password)) return
        setError(errorLog)
        setOpen(true)
    }, [errors])

    return (
        <div className='login'>
            <Container>
                <div className="login-box">
                    <div className="login-form">
                        <div className='logo'>
                            <img src={process.env.PUBLIC_URL + '/Icon.svg'} alt="" />
                            <p className='logo-text'>Welcome to E-Comm</p>
                            <p className='logo-subtext'>Sign in</p>
                        </div>
                        <form onSubmit={handleSubmit(submit)}>
                            <Input preIcon={<EmailOutlinedIcon/>} type={'text'} isError={!!errors.email} placeholder={'Your Email'} {...register('email')}/>
                            <Input preIcon={<LockOutlinedIcon/>} type={'password'} isError={!!errors.password} placeholder={'Password'} {...register('password')}/>
                            <Button variant={'filled'} type={'submit'}>Sign in</Button>
                        </form>
                    </div>
                </div>
            </Container>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={error}
            />
        </div>
    )
}

export default Login