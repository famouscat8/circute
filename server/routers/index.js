const express = require("express")
const router  = express.Router()

router.get("/", (req, res) =>
	   res.sendFile("/root/test/web/index.html"))


module.exports = router

