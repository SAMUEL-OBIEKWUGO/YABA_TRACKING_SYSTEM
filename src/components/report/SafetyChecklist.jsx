const checklist = [
  'Location is visible and precise',
  'Provide photos or short video if safe',
  'Mention nearby landmarks or landmarks',
  'Share emergency contact details only if needed',
]

function SafetyChecklist() {
  return (
    <aside className="report-card report-card--side">
      <div className="panel-header">
        <h2>Safety checklist</h2>
      </div>

      <ul className="check-list check-list--stacked">
        {checklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="response-box">
        <span className="eyebrow">Dispatch update</span>
        <strong>Response team en route</strong>
        <p>Estimated arrival: 8 minutes</p>
      </div>
    </aside>
  )
}

export default SafetyChecklist
