const locationNames = {
  'L0001':'Reception',
  'L0002':'Workshop 2',
}

export default function formatLocation (location) {
  return locationNames[location]
}