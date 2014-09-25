var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('nodebeer', { title: 'NodeBeer' });
});

router.get('/table', function(req, res) {
  res.render('index', { title: 'Tables' });
});

router.get('/table/:ntable', function(req, res) {
  res.render('index', { title: 'Table: '+ req.params.id });
});

module.exports = router;