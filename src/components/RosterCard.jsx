import { validateSocialURL, validateTalentName } from '../utils/socialValidation'
import FieldInput from './FieldInput'

function getFieldError(col, value) {
  if (col.type === 'text') return validateTalentName(value).error
  if (col.type === 'url') return validateSocialURL(value).error
  return null
}

const RosterCard = ({ schema, row, index, onUpdate, onRemove, canRemove }) => {
  return (
    <div className="card mb-3 talent-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0">
          <i className="bi bi-person-fill me-2"></i>
          #{index + 1}
        </h6>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(index)}
          disabled={!canRemove}
          title={!canRemove ? 'Cannot remove the last row' : 'Remove this row'}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
      <div className="card-body">
        {schema.columns.map((col, i) => {
          const value = row[col.key]
          const error = getFieldError(col, value)
          const isLast = i === schema.columns.length - 1
          return (
            <div key={col.key} className={isLast ? 'mb-0' : 'mb-3'}>
              <label className="form-label fw-semibold">
                {col.label}
                {col.required ? ' *' : ''}
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
    </div>
  )
}

export default RosterCard
