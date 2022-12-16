import { Container, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { registerSchema } from '../../schema/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IRegisterCredentials } from '../../types/types';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {register as registerAccount} from '../../redux/reducers/AuthReducer'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch =useAppDispatch()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<React.ReactNode>(<></>)
    const auth = useAppSelector(state => state.auth)
    const navigation = useNavigate()
    
    const submit = (data: IRegisterCredentials) => {
        dispatch(registerAccount(data))
    }

    const {register, handleSubmit, formState: { errors }} = useForm<IRegisterCredentials>({
        resolver: yupResolver(registerSchema)
    })
    useEffect(() => {
        if(auth.isAuthenticated) navigation('/')
    }, [auth])
    useEffect(() => {
        if(!(errors.email || errors.password)) return
        let errorLog: React.ReactNode = <div>
            {Object.values(errors).map(item => {
                return (<p>{item.message}</p>)
            })}
        </div>
        setError(errorLog)
        setOpen(true)
    }, [errors])
  return (
    <div>
        <Container>
            <div className="register-box">
                <div className="register-form">
                    <div className='logo'>
                        <img src={process.env.PUBLIC_URL + '/Icon.svg'} alt="" />
                        <p className='logo-text'>Welcome to E-Comm</p>
                        <p className='logo-subtext'>Sign in</p>
                    </div>
                    <form onSubmit={handleSubmit(submit)}>
                        <Input preIcon={<PersonOutlineOutlinedIcon/>} type={'text'} isError={!!errors.email} placeholder={'Your Username'} {...register('username')}/>
                        <Input preIcon={<EmailOutlinedIcon/>} type={'text'} isError={!!errors.email} placeholder={'Your Email'} {...register('email')}/>
                        <Input preIcon={<LockOutlinedIcon/>} type={'password'} isError={!!errors.password} placeholder={'Password'} {...register('password')}/>
                        <Input preIcon={<LockOutlinedIcon/>} type={'password'} isError={!!errors.password} placeholder={'Password Againg'} {...register('repassword')}/>
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

export default Register