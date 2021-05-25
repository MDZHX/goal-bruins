const express = require('express');
const router = express.Router()
const connection = require('../models/connect.js')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Parse the json object
router.use(express.json())

router.post("/login", async (req, res) =>{
    const { username, password } = req.body;
    let user;
    await User.findOne({ username : `${username}` }, (err, user_back) =>{
        if (err){
            return res.json({ status: 'error', error: 'Invalid username' })
        }

        
        user = user_back;
    })

    if (password == user.password){
        return res.json({
            status: 'ok'
        })
    }

    res.json({
        status: 'error',
        error: 'Invalid password'
    })
})



router.post('/register', (req, res) =>{

    const { username, password: plainTextPassword } = req.body

    const user = new User({
        username: `${username}`,
        password: `${plainTextPassword}`
    })

    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })

})

module.exports = router;
