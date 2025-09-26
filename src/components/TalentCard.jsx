import React from 'react';
import { validateSocialURL, validateTalentName } from '../utils/socialValidation';

const TalentCard = ({ talent, index, onUpdate, onRemove, canRemove }) => {
  const handleFieldChange = (field, value) => {
    onUpdate(index, field, value);
  };

  const getFieldError = (field, value) => {
    if (field === 'talentName') {
      const validation = validateTalentName(value);
      return validation.error;
    } else if (field.startsWith('social')) {
      const validation = validateSocialURL(value);
      return validation.error;
    }
    return null;
  };

  return (
    <div className="card mb-3 talent-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0">
          <i className="bi bi-person-fill me-2"></i>
          Talent #{index + 1}
        </h6>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(index)}
          disabled={!canRemove}
          title={!canRemove ? "Cannot remove the last talent" : "Remove this talent"}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
      <div className="card-body">
        {/* Talent Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-person me-1"></i>
            Talent Name *
          </label>
          <input
            type="text"
            className={`form-control ${getFieldError('talentName', talent.talentName) ? 'is-invalid' : ''}`}
            value={talent.talentName}
            onChange={(e) => handleFieldChange('talentName', e.target.value)}
            placeholder="Enter talent name"
          />
          {getFieldError('talentName', talent.talentName) && (
            <div className="text-danger small mt-1">
              <i className="bi bi-exclamation-circle me-1"></i>
              {getFieldError('talentName', talent.talentName)}
            </div>
          )}
        </div>

        {/* Primary Social */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-star-fill me-1"></i>
            Primary Social *
          </label>
          <input
            type="url"
            className={`form-control ${getFieldError('primarySocial', talent.primarySocial) ? 'is-invalid' : ''}`}
            value={talent.primarySocial}
            onChange={(e) => handleFieldChange('primarySocial', e.target.value)}
            placeholder="https://..."
          />
          {getFieldError('primarySocial', talent.primarySocial) && (
            <div className="text-danger small mt-1">
              <i className="bi bi-exclamation-circle me-1"></i>
              {getFieldError('primarySocial', talent.primarySocial)}
            </div>
          )}
        </div>

        {/* Social 2 */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-link-45deg me-1"></i>
            Social 2
          </label>
          <input
            type="url"
            className={`form-control ${getFieldError('social2', talent.social2) ? 'is-invalid' : ''}`}
            value={talent.social2}
            onChange={(e) => handleFieldChange('social2', e.target.value)}
            placeholder="https://..."
          />
          {getFieldError('social2', talent.social2) && (
            <div className="text-danger small mt-1">
              <i className="bi bi-exclamation-circle me-1"></i>
              {getFieldError('social2', talent.social2)}
            </div>
          )}
        </div>

        {/* Social 3 */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-link-45deg me-1"></i>
            Social 3
          </label>
          <input
            type="url"
            className={`form-control ${getFieldError('social3', talent.social3) ? 'is-invalid' : ''}`}
            value={talent.social3}
            onChange={(e) => handleFieldChange('social3', e.target.value)}
            placeholder="https://..."
          />
          {getFieldError('social3', talent.social3) && (
            <div className="text-danger small mt-1">
              <i className="bi bi-exclamation-circle me-1"></i>
              {getFieldError('social3', talent.social3)}
            </div>
          )}
        </div>

        {/* Social 4 */}
        <div className="mb-0">
          <label className="form-label fw-semibold">
            <i className="bi bi-link-45deg me-1"></i>
            Social 4
          </label>
          <input
            type="url"
            className={`form-control ${getFieldError('social4', talent.social4) ? 'is-invalid' : ''}`}
            value={talent.social4}
            onChange={(e) => handleFieldChange('social4', e.target.value)}
            placeholder="https://..."
          />
          {getFieldError('social4', talent.social4) && (
            <div className="text-danger small mt-1">
              <i className="bi bi-exclamation-circle me-1"></i>
              {getFieldError('social4', talent.social4)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalentCard;