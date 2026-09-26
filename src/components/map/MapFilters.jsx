function MapFilters({ activeFilter, setActiveFilter }) {
  const filterOptions = ['All', 'High', 'Medium', 'Low']

  return (
    <div className="map-filter-row" aria-label="Incident filters">
      {filterOptions.map((option) => (
        <button
          key={option}
          type="button"
          className={activeFilter === option ? 'map-filter is-active' : 'map-filter'}
          onClick={() => setActiveFilter(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default MapFilters
