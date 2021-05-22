const express = require('express');
const router = express.Router()
const connection = require('../models/connect.js')
const User = require('../models/user')

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
