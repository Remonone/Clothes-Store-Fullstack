import { getItem, putItem } from '@api/aws/aws.s3'
import { Router } from 'express'

const aws = Router()

aws.get('/', getItem)
aws.post('/', putItem)

export default aws
