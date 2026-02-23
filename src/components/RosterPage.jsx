import { useState } from 'react'
import RosterView from './RosterView'
import FilenameModal from './FilenameModal'
import { downloadRosterCSV, validateRosterData } from '../utils/csvExport'
import { saveRosterData, loadRosterData, clearRosterData, getRosterFormattedLastSaved } from '../utils/localStorage'
import { useAutoSave } from '../hooks/useAutoSave'

function buildDefaultFilename(schema) {
  const date = new Date().toISOString().split('T')[0]
  const base = schema.csvFilename.replace('.csv', '')
  return `${base}-${date}.csv`
}

const RosterPage = ({ schema }) => {
  const [data, setData] = useState(() => {
    const saved = loadRosterData(schema.storageKey)
    return saved && saved.length > 0 ? saved : schema.defaultRows
  })

  const [exportErrors, setExportErrors] = useState([])
  const [showExportErrors, setShowExportErrors] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [lastSaved, setLastSaved] = useState(() => getRosterFormattedLastSaved(schema.storageKey))

  const { saveNow } = useAutoSave(
    data,
    (d) => {
      const success = saveRosterData(schema.storageKey, d)
      if (success) setLastSaved(getRosterFormattedLastSaved(schema.storageKey))
      return success
    },
    10000,
  )

  const handleExportCSV = () => {
    const validation = validateRosterData(schema, data)
    if (validation.isValid) {
      setExportErrors([])
      setShowExportErrors(false)
      setShowDownloadModal(true)
    } else {
      setExportErrors(validation.errors)
      setShowExportErrors(true)
    }
  }

  const handleDownload = (filename) => {
    downloadRosterCSV(schema, data, filename)
    setShowDownloadModal(false)
  }

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      const emptyRow = Object.fromEntries(
        schema.columns.map((col) => [col.key, col.type === 'multiselect' ? [] : ''])
      )
      setData([emptyRow])
      clearRosterData(schema.storageKey)
      setLastSaved('Never')
      setExportErrors([])
      setShowExportErrors(false)
    }
  }

  const handleManualSave = () => {
    const success = saveNow()
    if (success) setLastSaved(getRosterFormattedLastSaved(schema.storageKey))
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-1">{schema.title}</h1>
              <p className="text-muted mb-0 small">
                <i className="bi bi-cloud-check me-1"></i>
                Auto-saved: {lastSaved}
              </p>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-info btn-sm" onClick={handleManualSave}>
                <i className="bi bi-cloud-arrow-up me-2"></i>
                Save Now
              </button>

              <button className="btn btn-outline-secondary" onClick={clearData}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Clear All
              </button>

              <button className="btn btn-primary" onClick={handleExportCSV}>
                <i className="bi bi-download me-2"></i>
                Download File
              </button>
            </div>
          </div>

          {showExportErrors && exportErrors.length > 0 && (
            <div className="alert alert-danger alert-dismissible" role="alert">
              <h6 className="alert-heading">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Cannot Export - Please Fix These Issues:
              </h6>
              <ul className="mb-0">
                {exportErrors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowExportErrors(false)}
              ></button>
            </div>
          )}

          <RosterView schema={schema} data={data} onDataChange={setData} />

          <div className="mt-4">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-cloud-check me-2"></i>
                      Auto-Save
                    </h6>
                    <p className="card-text small text-muted">
                      Your work is automatically saved to your browser every 10 seconds after making
                      changes. Data persists between sessions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-shield-check me-2"></i>
                      Data Validation
                    </h6>
                    <p className="card-text small text-muted">
                      Required fields and social media URLs are validated before export. Invalid
                      entries will be highlighted as you type.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-file-earmark-spreadsheet me-2"></i>
                      CSV Export
                    </h6>
                    <p className="card-text small text-muted">
                      When finished, click "Download File" to export your data as a CSV and send it
                      to us so that we can load your information into our system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <FilenameModal
          defaultFilename={buildDefaultFilename(schema)}
          onConfirm={handleDownload}
          onCancel={() => setShowDownloadModal(false)}
        />
      )}
    </div>
  )
}

export default RosterPage
