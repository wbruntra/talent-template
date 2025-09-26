/**
 * Converts talent data to CSV format and triggers download
 * @param {Array} data - Array of talent objects
 * @param {string} filename - Name of the file to download
 */
export function downloadCSV(data, filename = 'talent-data.csv') {
  // Filter out completely empty rows (no talent name)
  const validData = data.filter(row => row.talentName && row.talentName.trim() !== '');
  
  // CSV headers matching the template format
  const headers = ['Talent Name', 'Primary Social', 'Social 2', 'Social 3', 'Social 4'];
  
  // Convert data to CSV rows
  const csvRows = [
    // Header row
    headers.join(','),
    // Data rows
    ...validData.map(row => {
      const csvRow = [
        escapeCsvField(row.talentName || ''),
        escapeCsvField(row.primarySocial || ''),
        escapeCsvField(row.social2 || ''),
        escapeCsvField(row.social3 || ''),
        escapeCsvField(row.social4 || '')
      ];
      return csvRow.join(',');
    })
  ];

  // Create CSV content
  const csvContent = csvRows.join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Escapes CSV field values to handle commas, quotes, and newlines
 * @param {string} field - The field value to escape
 * @returns {string} - Escaped field value
 */
function escapeCsvField(field) {
  if (field === null || field === undefined) {
    return '';
  }
  
  const stringField = String(field);
  
  // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  
  return stringField;
}

/**
 * Validates all talent data before export
 * @param {Array} data - Array of talent objects to validate
 * @returns {Object} - Validation result with isValid flag and errors array
 */
export function validateAllData(data) {
  const errors = [];
  let isValid = true;

  data.forEach((row, index) => {
    // Check if talent name is provided
    if (!row.talentName || row.talentName.trim() === '') {
      errors.push(`Row ${index + 1}: Talent name is required`);
      isValid = false;
    }

    // At least one social media URL should be provided
    const hasSocialMedia = [
      row.primarySocial,
      row.social2,
      row.social3,
      row.social4
    ].some(social => social && social.trim() !== '');

    if (!hasSocialMedia) {
      errors.push(`Row ${index + 1}: At least one social media URL is required`);
      isValid = false;
    }
  });

  return { isValid, errors };
}