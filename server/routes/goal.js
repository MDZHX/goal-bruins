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




router.get('/single-goal', async (req,res) => {
    const {name} = req.body;

    await Goal.findOne({ name : `${name}` }, (err, goal_back) =>{
        if (err){
            return res.json({ status: 'error', error: 'Invalid username' })
        }

        
        return res.json(goal_back);
    })
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