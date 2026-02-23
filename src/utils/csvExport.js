function escapeCsvField(field) {
  if (field === null || field === undefined) return ''
  const s = String(field)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function triggerDownload(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

/**
 * Exports roster data to a CSV file based on a schema definition.
 * Rows where the first required text column is empty are skipped.
 */
export function downloadRosterCSV(schema, data, filename) {
  const nameCol = schema.columns.find((c) => c.type === 'text' && c.required) ?? schema.columns[0]
  const validData = data.filter((row) => String(row[nameCol.key] ?? '').trim() !== '')

  const headers = schema.columns.map((col) => col.label)
  const csvRows = [
    headers.join(','),
    ...validData.map((row) =>
      schema.columns
        .map((col) => {
          const val = row[col.key]
          return escapeCsvField(Array.isArray(val) ? val.join(', ') : val ?? '')
        })
        .join(',')
    ),
  ]

  triggerDownload(csvRows.join('\n'), filename ?? schema.csvFilename)
}

/**
 * Validates all rows in a roster against the schema's column requirements
 * and any top-level validationRules (e.g. requireAtLeastOne).
 */
export function validateRosterData(schema, data) {
  const errors = []
  let isValid = true

  data.forEach((row, index) => {
    // Per-column required checks
    schema.columns.forEach((col) => {
      if (!col.required) return
      const val = row[col.key]
      const isEmpty = Array.isArray(val) ? val.length === 0 : !String(val ?? '').trim()
      if (isEmpty) {
        errors.push(`Row ${index + 1}: ${col.label} is required`)
        isValid = false
      }
    })

    // Schema-level group rules
    schema.validationRules?.forEach((rule) => {
      if (rule.type === 'requireAtLeastOne') {
        const cols = schema.columns.filter((c) => c.type === rule.columnType)
        const hasOne = cols.some((c) => String(row[c.key] ?? '').trim() !== '')
        if (!hasOne) {
          errors.push(`Row ${index + 1}: ${rule.message}`)
          isValid = false
        }
      }
    })
  })

  return { isValid, errors }
}
