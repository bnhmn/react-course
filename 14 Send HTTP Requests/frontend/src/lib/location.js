export async function sortPlacesByUserDistance(places = []) {
  const userPosition = await getUserPosition();
  return sortPlacesByDistance(places, userPosition);
}

async function getUserPosition() {
  return await new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
      (error) => resolve(null),
    );
  });
}

function sortPlacesByDistance(places = [], position = null) {
  return structuredClone(places)
    .map((place) => ({
      ...place,
      distance: position ? calculateDistance([position.lat, position.lon], [place.lat, place.lon]) : null,
    }))
    .sort((a, b) => a.distance - b.distance);
}

/**
 *
 * Calculates the distance between two points on the earth's surface using the "Haversine formula".
 * @see https://stackoverflow.com/a/27943/6316545.
 * @returns the distance in km.
 */
function calculateDistance(point1, point2) {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(value) {
  return (value * Math.PI) / 180;
}
