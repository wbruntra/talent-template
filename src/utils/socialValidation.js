// Social media platform validation utilities

export const SUPPORTED_PLATFORMS = {
  tiktok: {
    name: 'TikTok',
    patterns: [
      /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/?$/i,
      /^https?:\/\/(vm\.)?tiktok\.com\/[\w.-]+\/?$/i
    ]
  },
  instagram: {
    name: 'Instagram',
    patterns: [
      /^https?:\/\/(www\.)?instagram\.com\/[\w.-]+\/?$/i
    ]
  },
  youtube: {
    name: 'YouTube',
    patterns: [
      /^https?:\/\/(www\.)?youtube\.com\/(@|c\/|channel\/|user\/)[\w.-]+\/?$/i,
      /^https?:\/\/(www\.)?youtube\.com\/[\w.-]+\/?$/i
    ]
  },
  x: {
    name: 'X (Twitter)',
    patterns: [
      /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[\w.-]+\/?$/i
    ]
  },
  facebook: {
    name: 'Facebook',
    patterns: [
      /^https?:\/\/(www\.)?facebook\.com\/[\w.-]+\/?$/i,
      /^https?:\/\/(www\.)?fb\.com\/[\w.-]+\/?$/i
    ]
  },
  pinterest: {
    name: 'Pinterest',
    patterns: [
      /^https?:\/\/(www\.)?pinterest\.com\/[\w.-]+\/?$/i
    ]
  },
  snapchat: {
    name: 'Snapchat',
    patterns: [
      /^https?:\/\/(www\.)?snapchat\.com\/add\/[\w.-]+\/?$/i,
      /^https?:\/\/(www\.)?snapchat\.com\/u\/[\w.-]+\/?$/i
    ]
  }
};

/**
 * Validates if a URL belongs to one of the supported social media platforms
 * @param {string} url - The URL to validate
 * @returns {Object} - Validation result with isValid, platform, and error message
 */
export function validateSocialURL(url) {
  if (!url || url.trim() === '') {
    return { isValid: true, platform: null, error: null }; // Empty URLs are allowed
  }

  const trimmedUrl = url.trim();
  
  // Check if it's a valid URL format
  try {
    new URL(trimmedUrl);
  } catch {
    return { 
      isValid: false, 
      platform: null, 
      error: 'Please enter a valid URL starting with http:// or https://' 
    };
  }

  // Check against supported platforms
  for (const platform of Object.values(SUPPORTED_PLATFORMS)) {
    for (const pattern of platform.patterns) {
      if (pattern.test(trimmedUrl)) {
        return { 
          isValid: true, 
          platform: platform.name, 
          error: null 
        };
      }
    }
  }

  // If we get here, the URL doesn't match any supported platform
  const supportedPlatformNames = Object.values(SUPPORTED_PLATFORMS).map(p => p.name).join(', ');
  return { 
    isValid: false, 
    platform: null, 
    error: `URL must be from one of these platforms: ${supportedPlatformNames}` 
  };
}

/**
 * Validates talent name - ensures it's not empty
 * @param {string} name - The talent name to validate
 * @returns {Object} - Validation result
 */
export function validateTalentName(name) {
  const trimmedName = name?.trim() || '';
  
  if (trimmedName === '') {
    return { 
      isValid: false, 
      error: 'Talent name is required' 
    };
  }
  
  return { 
    isValid: true, 
    error: null 
  };
}