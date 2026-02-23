export const talentSchema = {
  title: 'Talent Roster',
  storageKey: 'talent-roster',
  csvFilename: 'talent-submission.csv',
  columns: [
    { key: 'talentName',    label: 'Talent Name',    type: 'text', required: true },
    { key: 'primarySocial', label: 'Primary Social',  type: 'url',  required: false },
    { key: 'social2',       label: 'Social 2',        type: 'url',  required: false },
    { key: 'social3',       label: 'Social 3',        type: 'url',  required: false },
    { key: 'social4',       label: 'Social 4',        type: 'url',  required: false },
  ],
  validationRules: [
    { type: 'requireAtLeastOne', columnType: 'url', message: 'At least one social media URL is required' },
  ],
  defaultRows: [
    {
      talentName: 'Jane Doe',
      primarySocial: 'https://www.tiktok.com/@janedoe',
      social2: 'https://www.youtube.com/@JaneDoe',
      social3: '',
      social4: '',
    },
    {
      talentName: 'John Smith',
      primarySocial: 'https://www.instagram.com/johnsmith',
      social2: '',
      social3: '',
      social4: '',
    },
  ],
}
