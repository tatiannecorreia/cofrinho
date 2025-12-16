import { useState, useEffect } from 'react'
import './App.css'
import CategoryManager from './components/CategoryManager'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import FinancialSummary from './components/FinancialSummary'
import FinancialChart from './components/FinancialChart'
import Recommendations from './components/Recommendations'

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color: string
}

export interface Transaction {
  id: string
  categoryId: string
  amount: number
  description: string
  date: string
  type: 'income' | 'expense'
}

function App() {
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const savedCategories = localStorage.getItem('cofrinho-categories')
    const savedTransactions = localStorage.getItem('cofrinho-transactions')
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('cofrinho-categories', JSON.stringify(categories))
    }
  }, [categories])

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('cofrinho-transactions', JSON.stringify(transactions))
    }
  }, [transactions])

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    }
    setCategories([...categories, newCategory])
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id))
    setTransactions(transactions.filter(t => t.categoryId !== id))
  }

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    }
    setTransactions([...transactions, newTransaction])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <span className="money-icon">💰</span>
            Cofrinho
          </h1>
          <p className="subtitle">Controle Financeiro Pessoal</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="grid-layout">
            <section className="card">
              <h2>📁 Categorias</h2>
              <CategoryManager
                categories={categories}
                onAdd={addCategory}
                onDelete={deleteCategory}
              />
            </section>

            <section className="card">
              <h2>➕ Nova Transação</h2>
              <TransactionForm
                categories={categories}
                onAdd={addTransaction}
              />
            </section>

            <section className="card summary-card">
              <h2>📊 Resumo Financeiro</h2>
              <FinancialSummary
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                balance={balance}
              />
            </section>

            <section className="card chart-card">
              <h2>📈 Gráficos</h2>
              <FinancialChart
                transactions={transactions}
                categories={categories}
              />
            </section>

            <section className="card recommendations-card">
              <h2>💡 Recomendações</h2>
              <Recommendations
                transactions={transactions}
                categories={categories}
                balance={balance}
                totalExpenses={totalExpenses}
              />
            </section>

            <section className="card transactions-card">
              <h2>📋 Transações</h2>
              <TransactionList
                transactions={transactions}
                categories={categories}
                onDelete={deleteTransaction}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

