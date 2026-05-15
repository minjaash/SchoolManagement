const db = require("../server/dbconn");
const calculateDistance = require("../utilities/harvesineformula");

const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;
    
  if (!latitude || !longitude) {
    return res.status(400).json({
      error: "latitude and longitude are required",
    });
  }

  const userLat = parseFloat(latitude);
  const userLng = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({
      error: "Invalid latitude or longitude",
    });
  }

  //querying db for schools 
 db.query("SELECT * FROM Schools", (err, schools) => {
   if (err) {
  console.error("MYSQL ERROR:", err);
  return res.status(500).json({
    error: err.message,
  });

    }
// map through the array of schools and calculates the distance of each school from user using latititudes and logitudes and creates a new object for each school with a new key 'distance' and its value which is the distance of the user from the schools.
    const schoolsWithDistance = schools.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        school.latitude,
        school.longitude
      );

      return {
        ...school,
        distance_km: Number(distance.toFixed(2)),
      };
    });

    // Sort nearest schools first
    schoolsWithDistance.sort(
      (a, b) => a.distance_km - b.distance_km
    );

    return res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  });

  
};
module.exports=listSchools;