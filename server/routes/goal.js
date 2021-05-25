const express = require('express');
const router = express.Router()
const connection = require('../models/connect.js')
const Goal = require('../models/goal');
const { route } = require('./user.js');


router.use(express.json());
//sandbox methods

router.post('/add-goal', (req, res) =>{
    const {name, description} = req.body;
    const goal = new Goal({
        name: `${name}`,
        description: `${description}`
    })

    goal.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })

})



router.get('/all-goals',(req, res) => {
    Goal.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

module.exports = router;




router.get('/single-goal',(req,res) => {
    Goal.findById('60a4bf7bddaa19e13efffdd7')       //this is just an example, replace this with variable id
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})








// actual methods
router.get('/show-all-goals-by-everyone',(req,res) => {
    Goal.find()
        .then((result)=> {
            res.send(result);
            // res.render('index',{title: 'All Goals', goals: result});
        })
        .catch((err) => {
            console.log(err);
        });
})