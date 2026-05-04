import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { CATEGORY_COLORS } from './constants';

const TICK = { fill: '#54657e', fontSize: 12, fontFamily: 'Manrope, sans-serif' };

const TOOLTIP_STYLE = {
  background: '#0d1117',
  border: '1px solid rgba(148,163,184,0.15)',
  borderRadius: '9px',
  color: '#dce4f0',
  fontSize: '13px',
  fontFamily: 'Manrope, sans-serif',
};

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={TICK}
            axisLine={{ stroke: 'rgba(148,163,184,0.08)' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={TICK}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: 'rgba(148,163,184,0.05)' }}
          />
          <Bar dataKey="value" radius={[5, 5, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] ?? '#54657e'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
