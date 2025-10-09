import React, { useState, useCallback } from 'react';
import TalentCard from './TalentCard';
import { validateSocialURL, validateTalentName } from '../utils/socialValidation';

const ResponsiveTalentView = ({ data, onDataChange }) => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((rowIndex, field, value) => {
    let validation = { isValid: true, error: null };

    if (field === 'talentName') {
      validation = validateTalentName(value);
    } else if (field.startsWith('social')) {
      validation = validateSocialURL(value);
    }

    setErrors((prev) => ({
      ...prev,
      [`${rowIndex}-${field}`]: validation.error,
    }));

    return validation.isValid;
  }, []);

  const handleCellChange = useCallback(
    (rowIndex, field, value) => {
      // Update the data
      const newData = [...data];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [field]: value,
      };
      onDataChange(newData);

      // Validate the field
      validateField(rowIndex, field, value);
    },
    [data, onDataChange, validateField],
  );

  const addRow = useCallback(() => {
    const newRow = {
      talentName: '',
      primarySocial: '',
      social2: '',
      social3: '',
      social4: '',
    };
    onDataChange([...data, newRow]);
  }, [data, onDataChange]);

  const removeRow = useCallback(
    (rowIndex) => {
      if (data.length > 1) {
        const newData = data.filter((_, index) => index !== rowIndex);
        onDataChange(newData);

        // Clean up errors for removed row
        setErrors((prev) => {
          const newErrors = { ...prev };
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`${rowIndex}-`)) {
              delete newErrors[key];
            }
          });
          return newErrors;
        });
      }
    },
    [data, onDataChange],
  );

  const getErrorForField = (rowIndex, field) => {
    return errors[`${rowIndex}-${field}`];
  };

  return (
    <div className="talent-view-container">
      {/* Desktop Table View - Hidden on mobile */}
      <div className="d-none d-lg-block talent-table-container">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th style={{ minWidth: '180px' }}>Talent Name *</th>
                <th style={{ minWidth: '220px' }}>Primary Social *</th>
                <th style={{ minWidth: '220px' }}>Social 2</th>
                <th style={{ minWidth: '220px' }}>Social 3</th>
                <th style={{ minWidth: '220px' }}>Social 4</th>
                <th style={{ width: '100px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <div className="table-cell-wrapper">
                      <input
                        type="text"
                        className={`form-control ${
                          getErrorForField(rowIndex, 'talentName') ? 'is-invalid' : ''
                        }`}
                        value={row.talentName}
                        onChange={(e) => handleCellChange(rowIndex, 'talentName', e.target.value)}
                        placeholder="Enter talent name"
                      />
                      {getErrorForField(rowIndex, 'talentName') && (
                        <div className="error-tooltip">
                          {getErrorForField(rowIndex, 'talentName')}
                        </div>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="table-cell-wrapper">
                      <input
                        type="url"
                        className={`form-control ${
                          getErrorForField(rowIndex, 'primarySocial') ? 'is-invalid' : ''
                        }`}
                        value={row.primarySocial}
                        onChange={(e) => handleCellChange(rowIndex, 'primarySocial', e.target.value)}
                        placeholder="https://..."
                      />
                      {getErrorForField(rowIndex, 'primarySocial') && (
                        <div className="error-tooltip">
                          {getErrorForField(rowIndex, 'primarySocial')}
                        </div>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="table-cell-wrapper">
                      <input
                        type="url"
                        className={`form-control ${
                          getErrorForField(rowIndex, 'social2') ? 'is-invalid' : ''
                        }`}
                        value={row.social2}
                        onChange={(e) => handleCellChange(rowIndex, 'social2', e.target.value)}
                        placeholder="https://..."
                      />
                      {getErrorForField(rowIndex, 'social2') && (
                        <div className="error-tooltip">{getErrorForField(rowIndex, 'social2')}</div>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="table-cell-wrapper">
                      <input
                        type="url"
                        className={`form-control ${
                          getErrorForField(rowIndex, 'social3') ? 'is-invalid' : ''
                        }`}
                        value={row.social3}
                        onChange={(e) => handleCellChange(rowIndex, 'social3', e.target.value)}
                        placeholder="https://..."
                      />
                      {getErrorForField(rowIndex, 'social3') && (
                        <div className="error-tooltip">{getErrorForField(rowIndex, 'social3')}</div>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="table-cell-wrapper">
                      <input
                        type="url"
                        className={`form-control ${
                          getErrorForField(rowIndex, 'social4') ? 'is-invalid' : ''
                        }`}
                        value={row.social4}
                        onChange={(e) => handleCellChange(rowIndex, 'social4', e.target.value)}
                        placeholder="https://..."
                      />
                      {getErrorForField(rowIndex, 'social4') && (
                        <div className="error-tooltip">{getErrorForField(rowIndex, 'social4')}</div>
                      )}
                    </div>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeRow(rowIndex)}
                      disabled={data.length <= 1}
                      title={data.length <= 1 ? 'Cannot remove the last row' : 'Remove this talent'}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
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

      {/* Mobile Card View - Hidden on desktop */}
      <div className="d-lg-none">
        <div className="mobile-cards-container">
          {data.map((talent, index) => (
            <TalentCard
              key={index}
              talent={talent}
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
            Add New Talent
          </button>
        </div>
      </div>

      {/* Validation Rules - Shown on both views */}
      <div className="alert alert-info mt-3">
        <h6>
          <i className="bi bi-info-circle me-2"></i>Validation Rules:
        </h6>
        <ul className="mb-0">
          <li>
            <strong>Talent Name:</strong> Required field
          </li>
          <li>
            <strong>Social URLs:</strong> Must be valid URLs from supported platforms
          </li>
          <li>
            <strong>Primary Social:</strong> At least one social media URL is required. The
            "primary" social will be the first one shown when their profile is opened
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveTalentView;