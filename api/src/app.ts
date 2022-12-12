import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import apiContentType from './middlewares/apiContentType'
import productRouter from './routers/products.router'
import userRouter from './routers/user.router'
import errorHandler from './middlewares/apiErrorHandler'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(apiContentType)
app.use(express.json())
/** using passport also requires to ass session and cookieParser middlewares to express*/
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Set up routers
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)

// Custom API error handler
app.use(errorHandler)

export default app
