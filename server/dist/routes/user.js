"use strict";
const user_1 = require("../controllers/user");
const express_1 = require("express");
const router = express_1.Router();
router.post('/login', user_1.login);
module.exports = router;
