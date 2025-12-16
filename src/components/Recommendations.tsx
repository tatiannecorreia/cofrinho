import { Transaction, Category } from '../App'
import './Recommendations.css'

interface RecommendationsProps {
  transactions: Transaction[]
  categories: Category[]
  balance: number
  totalExpenses: number
}

export default function Recommendations({
  transactions,
  categories,
  balance,
  totalExpenses
}: RecommendationsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  // Calcular gastos por categoria
  const expensesByCategory = categories
    .filter(cat => cat.type === 'expense')
    .map(category => {
      const total = transactions
        .filter(t => t.categoryId === category.id && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
      return {
        category,
        total,
        percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0
      }
    })
    .filter(item => item.total > 0)
    .sort((a, b) => b.total - a.total)

  // Calcular quanto precisa reduzir se estiver negativo
  const needsReduction = balance < 0
  const reductionNeeded = Math.abs(balance)

  // Recomendações baseadas nos maiores gastos
  const recommendations: string[] = []

  if (needsReduction) {
    recommendations.push(
      `⚠️ Você precisa reduzir ${formatCurrency(reductionNeeded)} para sair do negativo.`
    )

    if (expensesByCategory.length > 0) {
      const topCategory = expensesByCategory[0]
      const reductionPercentage = (reductionNeeded / topCategory.total) * 100
      
      if (reductionPercentage <= 100) {
        recommendations.push(
          `💡 Reduza ${(reductionPercentage).toFixed(0)}% dos gastos em "${topCategory.category.name}" (${formatCurrency(reductionNeeded)}) para equilibrar suas finanças.`
        )
      } else {
        const multipleCategories = expensesByCategory.slice(0, 3)
        const totalTopCategories = multipleCategories.reduce((sum, item) => sum + item.total, 0)
        
        if (totalTopCategories >= reductionNeeded) {
          recommendations.push(
            `💡 Considere reduzir gastos nas categorias: ${multipleCategories.map(c => c.category.name).join(', ')} para economizar ${formatCurrency(reductionNeeded)}.`
          )
        }
      }
    }
  } else if (balance > 0) {
    const savingsPercentage = totalExpenses > 0 
      ? ((balance / (balance + totalExpenses)) * 100).toFixed(1)
      : '100'
    
    recommendations.push(
      `✅ Ótimo! Você está com saldo positivo de ${formatCurrency(balance)}.`
    )
    recommendations.push(
      `💰 Você está economizando ${savingsPercentage}% da sua renda. Continue assim!`
    )
  }

  // Adicionar recomendações sobre categorias com maior gasto
  if (expensesByCategory.length > 0) {
    const top3 = expensesByCategory.slice(0, 3)
    recommendations.push(
      `📊 Suas maiores despesas: ${top3.map(c => `${c.category.name} (${c.percentage.toFixed(1)}%)`).join(', ')}.`
    )

    // Sugerir redução se alguma categoria estiver acima de 30%
    const highSpending = expensesByCategory.filter(c => c.percentage > 30)
    if (highSpending.length > 0) {
      highSpending.forEach(category => {
        recommendations.push(
          `⚠️ "${category.category.name}" representa ${category.percentage.toFixed(1)}% dos seus gastos. Considere revisar essa categoria.`
        )
      })
    }
  }

  // Recomendação sobre frequência de gastos
  const expenseTransactions = transactions.filter(t => t.type === 'expense')
  if (expenseTransactions.length > 0) {
    const avgExpense = totalExpenses / expenseTransactions.length
    recommendations.push(
      `📈 Sua média de gasto por transação é ${formatCurrency(avgExpense)}.`
    )
  }

  return (
    <div className="recommendations">
      {recommendations.length > 0 ? (
        <div className="recommendations-list">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-item">
              <p>{rec}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="recommendations-empty">
          <p>Adicione transações para receber recomendações personalizadas</p>
        </div>
      )}

      {expensesByCategory.length > 0 && (
        <div className="category-breakdown">
          <h3>💸 Distribuição de Gastos</h3>
          <div className="breakdown-list">
            {expensesByCategory.map((item) => (
              <div key={item.category.id} className="breakdown-item">
                <div className="breakdown-header">
                  <div
                    className="breakdown-color"
                    style={{ backgroundColor: item.category.color }}
                  />
                  <span className="breakdown-name">{item.category.name}</span>
                  <span className="breakdown-value">{formatCurrency(item.total)}</span>
                </div>
                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.category.color
                    }}
                  />
                </div>
                <span className="breakdown-percentage">{item.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

