const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const body = require('body-parser');


router.get('/', (req,res) => {
    res.render('home');
});



module.exports = router;