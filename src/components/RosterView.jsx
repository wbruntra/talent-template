import { useState, useCallback } from 'react'
import { validateSocialURL, validateTalentName } from '../utils/socialValidation'
import FieldInput from './FieldInput'
import RosterCard from './RosterCard'
import RowModal from './RowModal'

function validateField(col, value) {
  if (col.type === 'text') return validateTalentName(value)
  if (col.type === 'url') return validateSocialURL(value)
  return { isValid: true, error: null }
}

function emptyRowFromSchema(schema) {
  return Object.fromEntries(
    schema.columns.map((col) => [col.key, col.type === 'multiselect' ? [] : ''])
  )
}

const RosterView = ({ schema, data, onDataChange }) => {
  const [errors, setErrors] = useState({})
  const [popOutIndex, setPopOutIndex] = useState(null)

  const handleCellChange = useCallback(
    (rowIndex, field, value) => {
      const newData = [...data]
      newData[rowIndex] = { ...newData[rowIndex], [field]: value }
      onDataChange(newData)

      const col = schema.columns.find((c) => c.key === field)
      if (col) {
        const result = validateField(col, value)
        setErrors((prev) => ({ ...prev, [`${rowIndex}-${field}`]: result.error }))
      }
    },
    [data, onDataChange, schema],
  )

  const addRow = useCallback(() => {
    onDataChange([...data, emptyRowFromSchema(schema)])
  }, [data, onDataChange, schema])

  const removeRow = useCallback(
    (rowIndex) => {
      if (data.length > 1) {
        onDataChange(data.filter((_, i) => i !== rowIndex))
        setErrors((prev) => {
          const next = { ...prev }
          Object.keys(next).forEach((key) => {
            if (key.startsWith(`${rowIndex}-`)) delete next[key]
          })
          return next
        })
        if (popOutIndex === rowIndex) setPopOutIndex(null)
      }
    },
    [data, onDataChange, popOutIndex],
  )

  const getError = (rowIndex, field) => errors[`${rowIndex}-${field}`] || null

  // Build validation info bullets from schema
  const validationInfo = [
    ...schema.columns.filter((c) => c.required).map((c) => `${c.label}: Required field`),
    ...(schema.columns.some((c) => c.type === 'url')
      ? ['Social URLs: Must be valid URLs from supported platforms']
      : []),
    ...(schema.validationRules?.map((r) => r.message) ?? []),
  ]

  return (
    <div className="talent-view-container">
      {/* Desktop Table View */}
      <div className="d-none d-lg-block talent-table-container">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                {schema.columns.map((col) => (
                  <th key={col.key} style={{ minWidth: col.type === 'multiselect' ? '240px' : col.type === 'text' ? '180px' : '220px' }}>
                    {col.label}{col.required ? ' *' : ''}
                  </th>
                ))}
                <th style={{ width: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {schema.columns.map((col) => {
                    const error = getError(rowIndex, col.key)
                    return (
                      <td key={col.key}>
                        <div className="table-cell-wrapper">
                          <FieldInput
                            col={col}
                            value={row[col.key]}
                            onChange={(val) => handleCellChange(rowIndex, col.key, val)}
                            isInvalid={!!error}
                          />
                          {error && <div className="error-tooltip">{error}</div>}
                        </div>
                      </td>
                    )
                  })}
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setPopOutIndex(rowIndex)}
                        title="Edit as card"
                      >
                        <i className="bi bi-arrows-fullscreen"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeRow(rowIndex)}
                        disabled={data.length <= 1}
                        title={data.length <= 1 ? 'Cannot remove the last row' : 'Remove this row'}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end mt-3 mb-3">
          <button className="btn btn-success" onClick={addRow}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Another Row
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="d-lg-none">
        <div className="mobile-cards-container">
          {data.map((row, index) => (
            <RosterCard
              key={index}
              schema={schema}
              row={row}
              index={index}
              onUpdate={handleCellChange}
              onRemove={removeRow}
              canRemove={data.length > 1}
            />
          ))}
        </div>

        <div className="text-center mt-3 mb-3">
          <button className="btn btn-success" onClick={addRow}>
            <i className="bi bi-plus-circle me-2"></i>
            Add New Row
          </button>
        </div>
      </div>

      <div className="alert alert-info mt-3">
        <h6>
          <i className="bi bi-info-circle me-2"></i>Validation Rules:
        </h6>
        <ul className="mb-0">
          {validationInfo.map((point, i) => (
            <li key={i}>
              {point.includes(':') ? (
                <>
                  <strong>{point.split(':')[0]}:</strong>
                  {point.slice(point.indexOf(':') + 1)}
                </>
              ) : (
                point
              )}
            </li>
          ))}
        </ul>
      </div>

      {popOutIndex !== null && (
        <RowModal
          schema={schema}
          row={data[popOutIndex]}
          index={popOutIndex}
          onUpdate={handleCellChange}
          onClose={() => setPopOutIndex(null)}
        />
      )}
    </div>
  )
}

export default RosterView
