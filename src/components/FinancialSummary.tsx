import './FinancialSummary.css'

interface FinancialSummaryProps {
  totalIncome: number
  totalExpenses: number
  balance: number
}

export default function FinancialSummary({ totalIncome, totalExpenses, balance }: FinancialSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const isNegative = balance < 0
  const percentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0

  return (
    <div className="financial-summary">
      <div className="summary-item income">
        <div className="summary-icon">💰</div>
        <div className="summary-content">
          <span className="summary-label">Total de Entradas</span>
          <span className="summary-value income">{formatCurrency(totalIncome)}</span>
        </div>
      </div>

      <div className="summary-item expense">
        <div className="summary-icon">💸</div>
        <div className="summary-content">
          <span className="summary-label">Total de Saídas</span>
          <span className="summary-value expense">{formatCurrency(totalExpenses)}</span>
          {totalIncome > 0 && (
            <span className="summary-percentage">
              {percentage.toFixed(1)}% das entradas
            </span>
          )}
        </div>
      </div>

      <div className={`summary-item balance ${isNegative ? 'negative' : 'positive'}`}>
        <div className="summary-icon">{isNegative ? '⚠️' : '✅'}</div>
        <div className="summary-content">
          <span className="summary-label">Saldo Atual</span>
          <span className={`summary-value balance ${isNegative ? 'negative' : 'positive'}`}>
            {formatCurrency(balance)}
          </span>
          {isNegative && (
            <span className="summary-warning">
              Você está no negativo!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

