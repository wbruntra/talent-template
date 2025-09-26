import { useState } from 'react'
import TalentTable from './components/TalentTable'
import { downloadCSV, validateAllData } from './utils/csvExport'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  // Initialize with sample data from the template
  const [talentData, setTalentData] = useState([
    {
      talentName: 'Jane Doe',
      primarySocial: 'https://www.tiktok.com/@janedoe',
      social2: 'https://www.youtube.com/@JaneDoe',
      social3: '',
      social4: '',
      tags: '',
    },
    {
      talentName: 'John Smith',
      primarySocial: 'https://www.instagram.com/johnsmith',
      social2: '',
      social3: '',
      social4: '',
      tags: '',
    },
  ])

  const [exportErrors, setExportErrors] = useState([])
  const [showExportErrors, setShowExportErrors] = useState(false)

  const handleExportCSV = () => {
    const validation = validateAllData(talentData)

    if (validation.isValid) {
      downloadCSV(talentData, 'talent-submission.csv')
      setExportErrors([])
      setShowExportErrors(false)
    } else {
      setExportErrors(validation.errors)
      setShowExportErrors(true)
    }
  }

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setTalentData([
        {
          talentName: '',
          primarySocial: '',
          social2: '',
          social3: '',
          social4: '',
          tags: '',
        },
      ])
      setExportErrors([])
      setShowExportErrors(false)
    }
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-1">Talent Roster</h1>
            </div>

            <div className="d-flex gap-2">
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
                {exportErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowExportErrors(false)}
              ></button>
            </div>
          )}

          <TalentTable data={talentData} onDataChange={setTalentData} />

          <div className="mt-4">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-shield-check me-2"></i>
                      Data Validation
                    </h6>
                    <p className="card-text small text-muted">
                      All social media URLs are automatically validated against supported
                      platforms. Invalid URLs will show an error.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className="bi bi-file-earmark-spreadsheet me-2"></i>
                      CSV Export
                    </h6>
                    <p className="card-text small text-muted">
                      When finished, click "Download File" to export your data as a CSV and send it
                      to us so that we can load your talent information into our system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
