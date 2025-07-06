import express from 'express'
import { getTransactions, createTransaction, deleteTransaction, editTransaction } from '../controllers/transactionController'
import { asyncHandler } from '../utils/asyncHandler'

const router = express.Router()

router.get('/', getTransactions)
router.post('/', createTransaction)
router.put('/:id', asyncHandler(editTransaction))
router.delete('/:id', deleteTransaction)

export default router
