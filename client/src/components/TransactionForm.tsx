'use client'
import { useState } from 'react'
import { Transaction } from '../types/transaction'

interface Props {
  onSubmit: (tx: Transaction) => void
}

export default function TransactionForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Transaction>({
    amount: 0,
    description: '',
    date: '',
    category: 'Uncategorized',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.amount || !form.description || !form.date) {
      alert('Please fill all fields')
      return
    }
    onSubmit(form)
    setForm({ amount: 0, description: '', date: '', category: 'Uncategorized' })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 mb-6">
      <input
        type="number"
        value={form.amount}
        placeholder="Amount"
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
        className="border p-2"
      />
      <input
        type="text"
        value={form.description}
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2"
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  )
}
