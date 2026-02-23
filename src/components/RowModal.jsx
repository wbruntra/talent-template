import { useEffect } from 'react'
import { validateSocialURL, validateTalentName } from '../utils/socialValidation'
import FieldInput from './FieldInput'

function getFieldError(col, value) {
  if (col.type === 'text') return validateTalentName(value).error
  if (col.type === 'url') return validateSocialURL(value).error
  return null
}

const RowModal = ({ schema, row, index, onUpdate, onClose }) => {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-person-fill me-2"></i>
              Row #{index + 1}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {schema.columns.map((col) => {
              const value = row[col.key]
              const error = getFieldError(col, value)
              return (
                <div key={col.key} className="mb-3">
                  <label className="form-label fw-semibold">
                    {col.label}{col.required ? ' *' : ''}
                  </label>
                  <FieldInput
                    col={col}
                    value={value}
                    onChange={(val) => onUpdate(index, col.key, val)}
                    isInvalid={!!error}
                  />
                  {error && (
                    <div className="text-danger small mt-1">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {error}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RowModal
