import RosterPage from '../components/RosterPage'
import { athleteSchema } from '../schemas/athleteSchema'

export default function AthleteRosterPage() {
  return <RosterPage schema={athleteSchema} />
}
