import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {errorHandler,notFound} from './middlewares/errorMiddleware.js'

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'build')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

app.use('/api/products',productRoutes)

app.use('/api/users',userRoutes)

app.use('/api/orders',orderRoutes)

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server is Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))