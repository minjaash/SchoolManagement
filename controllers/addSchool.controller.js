const db = require("../server/dbconn");


const addSchool=(req,res)=>{
    const { name, address, latitude, longitude } = req.body;
      const lat = Number(latitude);
      const lon = Number(longitude);

    if(!name ||typeof(name)!=='string'){
       return res.status(400).json({"message":"invalid name"});
    }
    if(!address ||typeof(address)!=='string'){
      return  res.status(400).json({"message":"invalid address"});
    }
    if(!lat ||typeof(lat)!=='number'){
      return  res.status(400).json({"message":"invalid latitude"});
    }
    if(!lon ||typeof(lon)!=='number'){
      return  res.status(400).json({"message":"invalid longitude"});
    }

  const sql =
    "INSERT INTO Schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

db.query(sql, [name, address, lat, lon], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: name+" added successfully",
      school:name,
      schoolId:result.insertId
    });
  });

}
module.exports=addSchool;