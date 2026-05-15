const { Router } = require("express");
const addSchool = require("../controllers/addSchool.controller");
const listSchools = require("../controllers/listSchools.controller");

const router = Router();

router.post('/addSchool',addSchool);
router.get('/listSchools',listSchools);

module.exports=router;