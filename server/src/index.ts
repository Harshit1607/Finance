import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import transactionRoutes from './routes/transactionRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

// ✅ CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://finance-harshit-barejas-projects.vercel.app", "https://finance-rho-opal.vercel.app"], // set this in your .env (e.g., http://localhost:3000)
    credentials: true, // if you use cookies/auth headers
  })
)

app.use(express.json())

app.use('/api/transactions', transactionRoutes)

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error(err))
