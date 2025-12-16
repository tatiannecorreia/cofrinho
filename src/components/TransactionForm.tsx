import { useState } from 'react'
import { Category, Transaction } from '../App'
import './TransactionForm.css'

interface TransactionFormProps {
  categories: Category[]
  onAdd: (transaction: Omit<Transaction, 'id'>) => void
}

export default function TransactionForm({ categories, onAdd }: TransactionFormProps) {
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [type, setType] = useState<'income' | 'expense'>('expense')

  const filteredCategories = categories.filter(cat => cat.type === type)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (categoryId && amount && description.trim()) {
      const selectedCategory = categories.find(c => c.id === categoryId)
      if (selectedCategory) {
        onAdd({
          categoryId,
          amount: parseFloat(amount),
          description: description.trim(),
          date,
          type: selectedCategory.type
        })
        setAmount('')
        setDescription('')
        setCategoryId('')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label>Tipo</label>
        <div className="type-toggle">
          <button
            type="button"
            className={`type-btn ${type === 'income' ? 'active income' : ''}`}
            onClick={() => {
              setType('income')
              setCategoryId('')
            }}
          >
            💰 Entrada
          </button>
          <button
            type="button"
            className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
            onClick={() => {
              setType('expense')
              setCategoryId('')
            }}
          >
            💸 Saída
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Categoria</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="form-input"
          required
        >
          <option value="">Selecione uma categoria</option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {filteredCategories.length === 0 && (
          <p className="warning">Crie uma categoria de {type === 'income' ? 'entrada' : 'saída'} primeiro</p>
        )}
      </div>

      <div className="form-group">
        <label>Valor (R$)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-input"
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          placeholder="Ex: Salário, Aluguel, Supermercado..."
          required
        />
      </div>

      <div className="form-group">
        <label>Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <button
        type="submit"
        className="btn-submit"
        disabled={filteredCategories.length === 0}
      >
        Adicionar Transação
      </button>
    </form>
  )
}

