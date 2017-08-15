var express = require('express');
var router= express.Router();


router.get('/', (req, res)=>{
	// res.send(req.session)
	res.render('index')
})


module.exports = router;
