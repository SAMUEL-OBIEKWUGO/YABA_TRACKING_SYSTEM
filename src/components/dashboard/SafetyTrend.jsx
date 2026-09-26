function SafetyTrend({ summary }) {
  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Safety trend</h2>
      </div>

      <div className="bar-chart" aria-label="Monthly safety trend chart">
        {summary.map((value, index) => (
          <span key={index} style={{ height: `${value}%` }} />
        ))}
      </div>
    </article>
  )
}

export default SafetyTrend
