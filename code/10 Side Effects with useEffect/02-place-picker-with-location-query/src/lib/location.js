export function sortPlacesByDistance(places, position) {
  const { latitude, longitude } = position;
  const sortedPlaces = [...places];
  sortedPlaces.sort((a, b) => {
    const distanceA = calculateDistance(latitude, longitude, a.lat, a.lon);
    const distanceB = calculateDistance(latitude, longitude, b.lat, b.lon);
    return distanceA - distanceB;
  });
  return sortedPlaces;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const l1 = toRad(lat1);
  const l2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}
