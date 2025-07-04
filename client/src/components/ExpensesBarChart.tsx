'use client'
import { Transaction } from '../types/transaction'
import { format } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ExpensesBarChart({ transactions }: { transactions: Transaction[] }) {
  const chartData = Object.values(
    transactions.reduce((acc, tx) => {
      const month = format(new Date(tx.date), 'MMM yyyy')
      acc[month] = acc[month] || { month, total: 0 }
      acc[month].total += tx.amount
      return acc
    }, {} as Record<string, { month: string; total: number }>)
  )

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
