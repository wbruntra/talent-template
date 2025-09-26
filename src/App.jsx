import { useState } from 'react'
import ResponsiveTalentView from './components/ResponsiveTalentView'
import { downloadCSV, validateAllData } from './utils/csvExport'
import { saveTalentData, loadTalentData, clearSavedData, getFormattedLastSaved } from './utils/localStorage'
import { useAutoSave } from './hooks/useAutoSave'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  // Default sample data
  const defaultData = [
    {
      talentName: 'Jane Doe',
      primarySocial: 'https://www.tiktok.com/@janedoe',
      social2: 'https://www.youtube.com/@JaneDoe',
      social3: '',
      social4: '',
    },
    {
      talentName: 'John Smith',
      primarySocial: 'https://www.instagram.com/johnsmith',
      social2: '',
      social3: '',
      social4: '',
    },
  ];

  // Initialize with saved data or default data
  const [talentData, setTalentData] = useState(() => {
    const savedData = loadTalentData();
    return savedData && savedData.length > 0 ? savedData : defaultData;
  });

  const [exportErrors, setExportErrors] = useState([])
  const [showExportErrors, setShowExportErrors] = useState(false)
  const [lastSaved, setLastSaved] = useState(() => getFormattedLastSaved())

  // Auto-save functionality - saves 10 seconds after changes
  const { saveNow } = useAutoSave(talentData, (data) => {
    const success = saveTalentData(data);
    if (success) {
      setLastSaved(getFormattedLastSaved());
    }
    return success;
  }, 10000);

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
      const emptyData = [{
        talentName: '',
        primarySocial: '',
        social2: '',
        social3: '',
        social4: '',
      }];
      
      setTalentData(emptyData);
      clearSavedData();
      setLastSaved('Never');
      setExportErrors([]);
      setShowExportErrors(false);
    }
  }

  const handleManualSave = () => {
    const success = saveNow();
    if (success) {
      setLastSaved(getFormattedLastSaved());
    }
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-1">Talent Roster</h1>
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

          <ResponsiveTalentView data={talentData} onDataChange={setTalentData} />

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
                      Your work is automatically saved to your browser every 10 seconds after making changes. 
                      Data persists between sessions.
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
                      All social media URLs are automatically validated against supported
                      platforms. Invalid URLs will show an error.
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
