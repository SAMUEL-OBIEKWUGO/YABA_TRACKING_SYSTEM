function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="section-header">
      {eyebrow && <span className="eyebrow eyebrow--dark">{eyebrow}</span>}
      <div className="section-header__row">
        <h2>{title}</h2>
        {action}
      </div>
    </div>
  )
}

export default SectionHeader
