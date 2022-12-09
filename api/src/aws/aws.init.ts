import { AWS_REGION } from '@api/util/secrets'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  region: AWS_REGION,
})

export default s3
