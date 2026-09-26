const featureCards = [
  { title: 'Live incident map', text: 'Monitor active safety issues across Yaba in real time.' },
  { title: 'Fast community response', text: 'Dispatch updates keep residents informed every step of the way.' },
  { title: 'Trusted reporting', text: 'Secure submissions with clear context for faster action.' },
  { title: 'Actionable insights', text: 'Surface patterns and risks to help decision-makers act early.' },
]

function FeatureGrid() {
  return (
    <section className="feature-grid">
      {featureCards.map((feature) => (
        <article key={feature.title} className="feature-card">
          <div className="feature-icon" aria-hidden="true" />
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </section>
  )
}

export default FeatureGrid
