import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Transaction, Category } from '../App'
import './FinancialChart.css'

interface FinancialChartProps {
  transactions: Transaction[]
  categories: Category[]
}

export default function FinancialChart({ transactions, categories }: FinancialChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value)
  }

  // Agrupar transações por data
  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const date = transaction.date
    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0, profit: 0 }
    }
    if (transaction.type === 'income') {
      acc[date].income += transaction.amount
    } else {
      acc[date].expense += transaction.amount
    }
    acc[date].profit = acc[date].income - acc[date].expense
    return acc
  }, {} as Record<string, { date: string; income: number; expense: number; profit: number }>)

  const chartData = Object.values(transactionsByDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    }))

  // Dados para gráfico de pizza por categoria
  const categoryExpenses = categories
    .filter(cat => cat.type === 'expense')
    .map(category => {
      const total = transactions
        .filter(t => t.categoryId === category.id && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
      return {
        name: category.name,
        value: total,
        color: category.color
      }
    })
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)

  const categoryIncomes = categories
    .filter(cat => cat.type === 'income')
    .map(category => {
      const total = transactions
        .filter(t => t.categoryId === category.id && t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
      return {
        name: category.name,
        value: total,
        color: category.color
      }
    })
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="financial-chart">
      {chartData.length > 0 ? (
        <>
          <div className="chart-section">
            <h3>📊 Entradas, Saídas e Lucros ao Longo do Tempo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e1bee7" />
                <XAxis dataKey="date" stroke="#7b1fa2" />
                <YAxis stroke="#7b1fa2" tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#2e7d32"
                  strokeWidth={3}
                  name="Entradas"
                  dot={{ fill: '#2e7d32', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#c62828"
                  strokeWidth={3}
                  name="Saídas"
                  dot={{ fill: '#c62828', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#9c27b0"
                  strokeWidth={3}
                  name="Lucro"
                  dot={{ fill: '#9c27b0', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="charts-row">
            {categoryExpenses.length > 0 && (
              <div className="chart-section">
                <h3>💸 Saídas por Categoria</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryExpenses}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryExpenses.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {categoryIncomes.length > 0 && (
              <div className="chart-section">
                <h3>💰 Entradas por Categoria</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryIncomes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryIncomes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="chart-empty">
          <p>📊 Adicione transações para ver os gráficos</p>
        </div>
      )}
    </div>
  )
}

