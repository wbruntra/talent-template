# Napkin

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|

## User Preferences
- Concise responses, no emojis
- Avoid over-engineering — minimal changes to meet the ask

## Patterns That Work
- (accumulate here)

## Patterns That Don't Work
- (accumulate here)

## Domain Notes
- Vite + React 19 + Bootstrap 5 + React Router v7 project
- `src/App.jsx` is the router shell; `src/main.jsx` wraps with BrowserRouter
- Bootstrap Icons loaded in main.jsx; Bootstrap CSS loaded in App.jsx
- Auto-save via `useAutoSave` hook (10s debounce) — already generic, no changes needed
- Schema-driven architecture: each roster type defined in `src/schemas/*.js`
- Schema shape: `{ title, storageKey, csvFilename, columns[], validationRules[], defaultRows[] }`
- Column types: `text`, `url`, `multiselect` (multiselect columns carry an `options` array)
- Component hierarchy: RosterPage > RosterView > (table cells | RosterCard) > FieldInput > MultiSelect
- Generic utils: localStorage.js and csvExport.js take schema/storageKey as args
- localStorage keys: `${storageKey}-data` and `${storageKey}-last-saved`
- Adding a new roster type = one schema file + one thin page wrapper + one Route in App.jsx
- `src/sports.js` exports sport names; athleteSchema imports and passes them as col.options
