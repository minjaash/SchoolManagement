## School Mangement Api

# Features:
Add a new school with name, address, latitude, and longitude
List all schools sorted by distance from user location
Distance calculation using Haversine formula
MySQL database integration using Aiven
Environment-based configuration (.env)

# Tech Stack
Node.js
Express.js
MySQL (mysql2)
dotenv
CORS

#  Installation
1. Clone the repository
git clone <your-repo-url>
cd <your-project-folder>

2. Install dependencies
npm install
3. Setup environment variables

Create a .env file in server.js:

PORT=5000

DB_HOST=your_host
DB_PORT=27109
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_SSL_CA=your_ssl_ca_if_needed

# Run the Project
node app.js

or with nodemon:

nodemon app.js

Server runs at:

http://localhost:5000

 # API Endpoints
 1.Add School-
POST http://localhost:5000/api/schools/addSchool

Request Body
{
  "name": "ABC School",
  "address": "Main Road, Delhi",
  "latitude": 28.7041,
  "longitude": 77.1025
}
Response
{
  "message": "ABC School added successfully",
  "school": "ABC School",
  "schoolId": 1
}

2. List Schools (Sorted by Distance)
The api must have query params after the last '/' like '/?latitude=66.66&longitude=55.77'
GET http://localhost:5000/api/schools/listSchools?latitude=28.6139&longitude=77.2090

Response
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "name": "ABC School",
      "address": "Delhi",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "distance_km": 12.45
    }
  ]
}
# Harveysine Formula:
This function implements the Haversine formula, which calculates the shortest distance between two points on the Earth’s surface using latitude and longitude. This distance is called the great-circle distance.

Let’s break your code step by step in a simple way.

1. Function input
const calculateDistance = (lat1, lon1, lat2, lon2)

You pass:

(lat1, lon1) → first point (user location)
(lat2, lon2) → second point (school location)
2. Convert degrees to radians
const toRad = (deg) => deg * Math.PI / 180;


Math functions in JavaScript (sin, cos) work in radians, not degrees.

So this converts:

degrees → radians

Example:

90° = π/2 radians
3. Earth radius
const R = 6371;

This is:

average radius of Earth in kilometers

So final answer will be in km.

4. Difference in coordinates
const dLat = toRad(lat2 - lat1);
const dLon = toRad(lon2 - lon1);

This finds:

how far apart the two points are in latitude
how far apart they are in longitude

Then converts them to radians.

5. Haversine formula core part
const a =
  Math.sin(dLat / 2) ** 2 +
  Math.cos(toRad(lat1)) *
  Math.cos(toRad(lat2)) *
  Math.sin(dLon / 2) ** 2;

This is the main formula.

What it does (conceptually):

It calculates how “far apart” two points are on a sphere using:

latitude difference
longitude difference
spherical geometry
Breakdown:
sin²(dLat/2) → north-south distance effect
cos(lat1) * cos(lat2) → adjusts for Earth curvature
sin²(dLon/2) → east-west distance effect

So a is basically a mathematical representation of angular distance.

6. Central angle (c)
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

This converts a into the central angle between the two points.

7. Final distance
return R * c;

# Key Logic
 Input validation in controllers:
 'addSchool.controller.js' and 'listSchools.controller.js'

 Routes are managed by 'school.routes.js'

 MySQL queries using mysql2

 Distance calculation in utility function(Harvesine formula function)

 Sorting results by computed distancein ascending order.
 
# Environment Notes(optional)
SSL CA is optional depending on your MySQL provider.
For local development, SSL can be removed or replaced with file-based CA

