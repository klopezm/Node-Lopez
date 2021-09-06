import express from 'express'
import morgan from 'morgan'

import {createRole, createRoles} from './libs/initialSetup'
const app = express()
createRoles();

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/user.routes'
app.use(express.json())
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.json({
        author: 'elena',
        description: "",
        version: "1.0.0"
    })
})

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes)

export default app;
