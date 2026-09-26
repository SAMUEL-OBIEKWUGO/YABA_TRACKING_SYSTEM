function MetricCard({ label, value, tone = 'default' }) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <span className="metric-card__label">{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

export default MetricCard
