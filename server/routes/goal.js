const express = require('express');
const router = express.Router()
const connection = require('../models/connect.js')
const Goal = require('../models/goal')

router.get('/add-goal', (req, res) =>{
    const goal = new Goal({
        name: 'study',
        description: 'go study'
    })

    goal.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })

})

module.exports = router;
