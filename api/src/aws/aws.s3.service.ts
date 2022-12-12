import { InternalServerError } from '../helpers/apiError'
import s3 from './aws.init'
import { AWS_BUCKET } from '../util/secrets'

const aws_get = (key: string) => {
  const params = {
    Bucket: AWS_BUCKET,
    Key: key,
  }
  s3.getObject(params, (err, data) => {
    if (err) throw new InternalServerError('AWS ERROR', 500, err)
    return data
  })
}

const aws_put = (credentials: { key: string; body: any }) => {
  const params = {
    Bucket: AWS_BUCKET,
    Key: credentials.key,
    Body: credentials.body,
  }
  s3.putObject(params, (err, data) => {
    if (err) throw new InternalServerError('AWS ERROR', 500, err)
    return data
  })
}

const aws_delete = (key: string) => {
  const params = {
    Bucket: AWS_BUCKET,
    Key: key,
  }
  s3.deleteObject(params, (err, data) => {
    if (err) throw new InternalServerError('AWS ERROR', 500, err)
    return data
  })
}

export default { aws_put, aws_get, aws_delete }
