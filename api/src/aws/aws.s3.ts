import { getData } from '@api/util/jwt/jwt'
import { AWS_BUCKET } from '@api/util/secrets'
import { Request, Response, NextFunction } from 'express'
import awsS3Service from './aws.s3.service'

export const getItem = (req: Request, res: Response, next: NextFunction) => {
  const { filePath } = req.body
  const params = {
    Bucket: AWS_BUCKET,
    Key: filePath,
  }
  const result = awsS3Service.aws_get(params)
  return res.send({ result })
}

export const putItem = (req: Request, res: Response, next: NextFunction) => {
  const file: BinaryData = req.body
  const { webToken } = req.headers
  const user = getData(webToken as string)
  const params = {
    Bucket: AWS_BUCKET,
    Body: file,
    Key: user.id,
  }
  const result = awsS3Service.aws_put(params)
  return res.send({ result })
}
