import { useState } from 'react'
import { CATEGORY_COLORS } from './constants';

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter(t => t.category === filterCategory);
  }

  const handleConfirmDelete = () => {
    onDelete(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>
                <span
                  className="category-badge"
                  style={{
                    color: CATEGORY_COLORS[t.category] ?? 'var(--text-muted)',
                    background: `${CATEGORY_COLORS[t.category] ?? '#54657e'}18`,
                    borderColor: `${CATEGORY_COLORS[t.category] ?? '#54657e'}40`,
                  }}
                >
                  {t.category}
                </span>
              </td>
              <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                {t.type === "income" ? "+" : "-"}${t.amount}
              </td>
              <td>
                <button className="delete-btn" onClick={() => setPendingDeleteId(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pendingDeleteId !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Delete this transaction?</p>
            <div className="modal-actions">
              <button onClick={() => setPendingDeleteId(null)}>Cancel</button>
              <button onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList
