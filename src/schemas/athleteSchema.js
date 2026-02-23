import sports from '../sports'

export const athleteSchema = {
  title: 'Athlete Roster',
  storageKey: 'athlete-roster',
  csvFilename: 'athlete-submission.csv',
  columns: [
    { key: 'talentName',    label: 'Talent Name',    type: 'text',        required: true },
    { key: 'email',         label: 'Email',           type: 'email',       required: false },
    { key: 'sports',        label: 'Sport(s)',        type: 'multiselect', required: true, options: sports.map((s) => s.name) },
    { key: 'primarySocial', label: 'Primary Social',  type: 'url',         required: false },
    { key: 'social2',       label: 'Social 2',        type: 'url',         required: false },
    { key: 'social3',       label: 'Social 3',        type: 'url',         required: false },
  ],
  validationRules: [
    { type: 'requireAtLeastOne', columnType: 'url', message: 'At least one social media URL is required' },
  ],
  defaultRows: [
    {
      talentName: 'Jane Doe',
      email: '',
      sports: ['Basketball', 'Track & Field'],
      primarySocial: 'https://www.tiktok.com/@janedoe',
      social2: 'https://www.youtube.com/@JaneDoe',
      social3: '',
    },
    {
      talentName: 'John Smith',
      email: '',
      sports: ['Football'],
      primarySocial: 'https://www.instagram.com/johnsmith',
      social2: '',
      social3: '',
    },
  ],
}
