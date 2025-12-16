import { useState } from 'react'
import { Category } from '../App'
import './CategoryManager.css'

interface CategoryManagerProps {
  categories: Category[]
  onAdd: (category: Omit<Category, 'id'>) => void
  onDelete: (id: string) => void
}

const categoryColors = [
  '#9c27b0', '#7b1fa2', '#ba68c8', '#ab47bc',
  '#ce93d8', '#e1bee7', '#f3e5f5', '#8e24aa'
]

export default function CategoryManager({ categories, onAdd, onDelete }: CategoryManagerProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [color, setColor] = useState(categoryColors[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAdd({ name: name.trim(), type, color })
      setName('')
    }
  }

  return (
    <div className="category-manager">
      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="category-input"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          className="category-select"
        >
          <option value="income">Entrada</option>
          <option value="expense">Saída</option>
        </select>
        <div className="color-picker">
          {categoryColors.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-option ${color === c ? 'active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              title={c}
            />
          ))}
        </div>
        <button type="submit" className="btn-add">Adicionar</button>
      </form>

      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div
              className="category-color"
              style={{ backgroundColor: category.color }}
            />
            <div className="category-info">
              <span className="category-name">{category.name}</span>
              <span className={`category-type ${category.type}`}>
                {category.type === 'income' ? '💰 Entrada' : '💸 Saída'}
              </span>
            </div>
            <button
              onClick={() => onDelete(category.id)}
              className="btn-delete"
              title="Excluir categoria"
            >
              ×
            </button>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="empty-message">Nenhuma categoria cadastrada</p>
        )}
      </div>
    </div>
  )
}

