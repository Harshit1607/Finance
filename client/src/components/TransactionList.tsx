'use client'
import { useState } from 'react'
import { Transaction } from '../types/transaction'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  transactions: Transaction[]
  onDelete: (id: string) => void
  onEdit: (tx: Transaction) => void
}

export default function TransactionList({ transactions, onDelete, onEdit }: Props) {
  const [editingId, setEditingId] = useState<string | undefined>("")
  const [form, setForm] = useState<Transaction>({
    _id: "",
    amount: 0,
    description: '',
    date: '',
    category: 'Uncategorized',
  })

  const startEdit = (tx: Transaction) => {
    setEditingId(tx._id)
    setForm({ ...tx })
  }

  const handleSubmit = () => {
    if (!form.amount || !form.description || !form.date) {
      alert('Please fill all fields')
      return
    }
    onEdit(form)
    setEditingId("")
    setForm({ _id: "", amount: 0, description: '', date: '', category: 'Uncategorized' })
  }

  return (
    <ul className="space-y-4">
      {transactions.map((tx) => (
        <li key={tx._id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200 p-4 rounded-md shadow-sm">
          {editingId === tx._id ? (
            <div className="flex flex-col md:flex-row gap-2 md:items-center w-full">
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

              <input
                type="text"
                value={form.description}
                placeholder="Description"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border rounded-md p-2 w-full"
              />

              <DatePicker
                selected={form.date ? new Date(form.date) : null}
                onChange={(date: Date | null) => {
                  if (date) {
                    setForm({ ...form, date: date.toISOString().split('T')[0] })
                  }
                }}
                placeholderText="Select date"
                className="border rounded-md p-2 w-full md:w-40"
                dateFormat="dd MMM yyyy"
              />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-2 md:items-center w-full justify-between">
              <div className="text-gray-200 font-medium">
                ₹{tx.amount} - {tx.description}
              </div>
              <div className="text-gray-200 text-sm">{format(new Date(tx.date), 'dd MMM yyyy')}</div>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            {editingId === tx._id ? (
              <button
                onClick={handleSubmit}
                className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm"
              >
                ✅ Save
              </button>
            ) : (
              <button
                onClick={() => startEdit(tx)}
                className="text-blue-400 hover:cursor-pointer text-sm"
              >
                ✏️ Edit
              </button>
            )}
            <button
              onClick={() => tx._id && onDelete(tx._id)}
              className="text-red-600 hover:cursor-pointer text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
