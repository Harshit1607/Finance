'use client'
import { useEffect, useState } from 'react'
import { Transaction } from '../types/transaction'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import ExpensesBarChart from '../components/ExpensesBarChart'
import { fetchTransactions, createTransaction, deleteTransaction } from '../services/transactionService'

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const getData = async () => {
    const data = await fetchTransactions()
    setTransactions(data)
  }

  const handleAdd = async (tx: Transaction) => {
    await createTransaction(tx)
    getData()
  }

  const handleDelete = async (id: string) => {
    await deleteTransaction(id)
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>
      <TransactionForm onSubmit={handleAdd} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
      <ExpensesBarChart transactions={transactions} />
    </main>
  )
}
