import { Container, Snackbar } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
// UPLOADING
const LoadProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [availability, setAvailability] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [image, setImage] = useState<File>()
    const [rating, setRating] = useState('')

    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {
            name: name,
            price: price,
            availability: availability,
            category: category,
            description: [description],
            characteristics: {},
            tags: tag,
            images: [image],
            rating: rating
        }
        console.log(body)
        axios.post('http://localhost:8000/api/v1/products/', body).then(() =>
            setOpen(true)
        )
    }
  return (
    <div>
        <Container>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div className="form">
                    <Input type={'text'} placeholder={'name'} onChange={(e)=> {setName(e.target.value)}} />
                    <Input type={'number'} placeholder={'price'} onChange={(e)=> {setPrice(e.target.value)}} />
                    <Input type={'text'} placeholder={'availability'} onChange={(e)=> {setAvailability(e.target.value)}} />
                    <Input type={'text'} placeholder={'category'} onChange={(e)=> {setCategory(e.target.value)}} />
                    <Input type={'text'} placeholder={'description'} onChange={(e)=> {setDescription(e.target.value)}} />
                    <Input type={'text'} placeholder={'tag'} onChange={(e)=> {setTag(e.target.value)}} />
                    <Input type={'file'} placeholder={'image'} onChange={(e)=> {setImage(e.target.files![0])}} />
                    <Input type={'number'} placeholder={'rating'} onChange={(e)=> {setRating(e.target.value)}} />
                </div>
                <Button variant={'filled'} type={'submit'}>Upload</Button>
            </form>
        </Container>
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={()=>setOpen(false)}
            message={'Product was uploaded'}
        />
    </div>
  )
}

export default LoadProduct