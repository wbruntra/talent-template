const allSports = [
  { name: 'Basketball', id: 1 },
  { name: 'Football', id: 2 },
  { name: 'Tennis', id: 3 },
  { name: 'Baseball', id: 4 },
  { name: 'Soccer', id: 5 },
  // { name: 'Hockey', id: 6 },
  { name: 'Golf', id: 7 },
  { name: 'Volleyball', id: 8 },
  { name: 'Swimming', id: 9 },
  { name: 'Track & Field', id: 10 },
  // { name: 'Other', id: 11 },
  { name: 'Cross Country', id: 12 },
  { name: 'Field Hockey', id: 13 },
  { name: 'Bowling', id: 14 },
  { name: 'Fencing', id: 15 },
  { name: 'Gymnastics', id: 16 },
  { name: 'Ice Hockey', id: 17 },
  // { name: 'Indoor Track and Field', id: 18 },
  { name: 'Rifle', id: 19 },
  { name: 'Skiing', id: 20 },
  { name: 'Diving', id: 21 },
  { name: 'Wrestling', id: 22 },
  { name: 'Beach Volleyball', id: 23 },
  { name: 'Lacrosse', id: 24 },
  // { name: 'Outdoor Track and Field', id: 25 },
  { name: 'Rowing', id: 26 },
  { name: 'Softball', id: 27 },
  { name: 'Water Polo', id: 28 },
]

const result = allSports.map((sport, i) => ({
  name: sport.name,
  id: i + 1,
}))

export default result
