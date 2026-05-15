//Harvesine formula  used to calculate the great-circle distance between two points on Earth using latitude and longitude.

const calculateDistance=(lat1, lon1, lat2, lon2) =>{
// convert angles from degree to radians 
    
const toRad = (deg) => deg * Math.PI / 180;

  const R = 6371; // Earth radius in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

//atan2 is preferred over acos here because it is numerically more stable for very small distances.
 
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// Distance in kilometers from the users location to school
  return R * c; 
}

module.exports=calculateDistance;