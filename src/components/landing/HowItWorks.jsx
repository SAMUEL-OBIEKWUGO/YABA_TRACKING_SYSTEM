import SectionHeader from '../common/SectionHeader'

const steps = [
  {
    number: '01',
    title: 'Report quickly',
    text: 'Log incidents in seconds with location, urgency, and photo support.',
  },
  {
    number: '02',
    title: 'Track live',
    text: 'See responders move from alert to action in real time.',
  },
  {
    number: '03',
    title: 'Stay informed',
    text: 'Receive safety alerts and neighborhood updates as they happen.',
  },
]

function HowItWorks() {
  return (
    <section className="info-section">
      <SectionHeader eyebrow="How it works" title="Fast, transparent reporting for every resident." />

      <div className="steps-grid">
        {steps.map((step) => (
          <article key={step.number} className="step-card">
            <span className="step-badge">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
