import TopNav from '../components/TopNav'
import SiteFooter from '../components/SiteFooter'
import HeroSection from '../components/landing/HeroSection'
import HowItWorks from '../components/landing/HowItWorks'
import TrustSection from '../components/landing/TrustSection'
import FeatureGrid from '../components/landing/FeatureGrid'

const stats = [
  { value: '24/7', label: 'Community monitoring' },
  { value: '2.4K', label: 'Residents protected' },
  { value: '94%', label: 'Issue response rate' },
]

function LandingPage() {
  return (
    <div className="professional-shell">
      <TopNav />

      <main className="landing-main">
        <HeroSection />

        <section className="stats-row" aria-label="Key platform metrics">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        <HowItWorks />
        <TrustSection />
        <FeatureGrid />
      </main>

      <SiteFooter />
    </div>
  )
}

export default LandingPage
