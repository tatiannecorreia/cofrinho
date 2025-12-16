import { Transaction, Category } from '../App'
import './TransactionList.css'

interface TransactionListProps {
  transactions: Transaction[]
  categories: Category[]
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, categories, onDelete }: TransactionListProps) {
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const getCategory = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <div className="transaction-list">
      {sortedTransactions.length === 0 ? (
        <p className="empty-message">Nenhuma transação registrada</p>
      ) : (
        <div className="transactions-container">
          {sortedTransactions.map((transaction) => {
            const category = getCategory(transaction.categoryId)
            return (
              <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                <div className="transaction-icon">
                  {transaction.type === 'income' ? '💰' : '💸'}
                </div>
                <div className="transaction-details">
                  <div className="transaction-header">
                    <span className="transaction-description">{transaction.description}</span>
                    <span className={`transaction-amount ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className="transaction-footer">
                    <span
                      className="transaction-category"
                      style={{ color: category?.color || '#999' }}
                    >
                      {category?.name || 'Categoria removida'}
                    </span>
                    <span className="transaction-date">{formatDate(transaction.date)}</span>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="btn-delete-transaction"
                  title="Excluir transação"
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

