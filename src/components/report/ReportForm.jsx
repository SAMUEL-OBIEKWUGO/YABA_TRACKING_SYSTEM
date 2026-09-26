function ReportForm({ form, setForm, onSubmit, error, setError, defaultForm }) {
  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const resetForm = () => {
    setForm(defaultForm)
    setError('')
  }

  return (
    <form className="incident-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <label>
          Incident type
          <select name="type" value={form.type} onChange={handleChange}>
            <option>Suspicious activity</option>
            <option>Traffic obstruction</option>
            <option>Streetlight outage</option>
            <option>Medical emergency</option>
          </select>
        </label>

        <label>
          Severity
          <select name="severity" value={form.severity} onChange={handleChange}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>
      </div>

      <label>
        Location
        <input name="location" type="text" value={form.location} onChange={handleChange} placeholder="Location" />
      </label>

      <label>
        Description
        <textarea
          name="description"
          rows="5"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what you saw"
        />
      </label>

      <div className="upload-box">
        <span>Attach photo or video</span>
        <button type="button">Browse files</button>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={resetForm}>
          Reset
        </button>
        <button type="submit" className="btn btn--primary">
          Submit report
        </button>
      </div>
    </form>
  )
}

export default ReportForm
