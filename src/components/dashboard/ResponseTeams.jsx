const teamStatus = [
  { name: 'Rapid Response Unit', status: 'On route', color: 'green' },
  { name: 'Community Watch', status: 'Monitoring', color: 'blue' },
  { name: 'Street Lighting Team', status: 'Scheduled', color: 'amber' },
]

function ResponseTeams() {
  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Response teams</h2>
      </div>

      <div className="team-list">
        {teamStatus.map((team) => (
          <div key={team.name} className="team-row">
            <div>
              <strong>{team.name}</strong>
              <span>{team.status}</span>
            </div>
            <span className={`status-badge status-badge--${team.color}`}>{team.status}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default ResponseTeams
