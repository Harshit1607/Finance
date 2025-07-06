'use client'
import { useState } from 'react'
import { Transaction } from '../types/transaction'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*"
          value={form.amount === 0 ? '' : form.amount}
          placeholder="Amount"
          onChange={(e) => {
            const val = e.target.value
            if (/^\d*$/.test(val)) {
              setForm({ ...form, amount: Number(val) || 0 })
            }
          }}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div>
        <input
          type="text"
          value={form.description}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div>
        <DatePicker
          selected={form.date ? new Date(form.date) : null}
          onChange={(date: Date | null) => {
            if (date) {
              setForm({ ...form, date: date.toISOString().split('T')[0] })
            }
          }}
          placeholderText="Select date"
          className="border rounded-md p-2 w-full"
          calendarClassName="z-50"
          dateFormat="dd MMM yyyy"
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 w-full"
        >
          ➕ Add
        </button>
      </div>
    </form>

  )
}
