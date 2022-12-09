import { InternalServerError } from '../helpers/apiError'
import { String } from 'aws-sdk/clients/apigateway'
import s3 from './aws.init'

const aws_get = (params: { Bucket: string; Key: string }) => {
  s3.getObject(params, (err, data) => {
    if (err) throw new InternalServerError('AWS ERROR', 500, err)
    return data
  })
}

const aws_put = (params: { Bucket: string; Key: string; Body: any }) => {
  s3.putObject(params, (err, data) => {
    if (err) throw new InternalServerError('AWS ERROR', 500, err)
    return data
  })
}

const aws_delete = (params: { Bucket: string; Key: string }) => {
  s3.deleteObject(params, (err, data) => {
    if (err) throw new InternalServerError('AWS ERROR', 500, err)
    return data
  })
}

export default { aws_put, aws_get, aws_delete }
