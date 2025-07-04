import axios from 'axios'
import { Transaction } from '../types/transaction'

const API_URL = 'http://localhost:5000/api/transactions'

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await axios.get(API_URL)
  return res.data
}

export const createTransaction = async (tx: Transaction) => {
  return await axios.post(API_URL, tx)
}

export const deleteTransaction = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`)
}
