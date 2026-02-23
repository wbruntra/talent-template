import MultiSelect from './MultiSelect'

/**
 * Renders the appropriate input element for a schema column.
 * Error display is handled by the parent (table cell or card field).
 *
 * @param {Object} col - Column definition from schema
 * @param {*} value - Current field value
 * @param {Function} onChange - Called with new value (not an event)
 * @param {boolean} isInvalid - Whether to apply error styling
 */
const FieldInput = ({ col, value, onChange, isInvalid = false }) => {
  const invalidClass = isInvalid ? ' is-invalid' : ''

  if (col.type === 'text') {
    return (
      <input
        type="text"
        className={`form-control${invalidClass}`}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${col.label.toLowerCase()}`}
      />
    )
  }

  if (col.type === 'email') {
    return (
      <input
        type="email"
        className={`form-control${invalidClass}`}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="email@example.com"
      />
    )
  }

  if (col.type === 'url') {
    return (
      <input
        type="url"
        className={`form-control${invalidClass}`}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
      />
    )
  }

  if (col.type === 'multiselect') {
    return (
      <MultiSelect
        options={col.options || []}
        value={value || []}
        onChange={onChange}
      />
    )
  }

  return null
}

export default FieldInput
