import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_KEY } from '../util/secrets'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  apiVersion: '2008-10-17',
  region: AWS_REGION,
})

export default s3
