import { useState, useEffect, useRef } from 'react'

const FilenameModal = ({ defaultFilename, onConfirm, onCancel }) => {
  const baseName = defaultFilename.endsWith('.csv')
    ? defaultFilename.slice(0, -4)
    : defaultFilename
  const [filename, setFilename] = useState(baseName)
  const inputRef = useRef(null)

  // Lock body scroll and focus+select input on open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    inputRef.current?.select()
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onCancel])

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = (filename.trim() || baseName) + '.csv'
    onConfirm(name)
  }

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '480px' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-download me-2"></i>
              Download CSV
            </h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <label className="form-label fw-semibold">Filename</label>
              <div className="input-group">
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  spellCheck={false}
                />
                <span className="input-group-text text-muted">.csv</span>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-download me-2"></i>
                Download
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FilenameModal
