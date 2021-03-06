const express = require('express');
const router = express.Router()
const connection = require('../models/connect.js')
const User = require('../models/user')
const Goal = require('../models/goal');
const { route } = require('./user.js');
const mongoose = require('mongoose');
router.use(express.json())



// sandbox methods

router.post('/add-goal', (req, res) =>{
    const {name, description} = req.body;
    const goal = new Goal({
        name: req.body["name"],
        description: req.body["description"],
        authorId: '60ac4ca4d0280499bfa67f17'
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






router.post('/single-goal', async (req,res) => {
    const {name} = req.body;

    await Goal.findOne({ name : `${name}` }, (err, goal_back) =>{
        if (err){
            console.log(err);
            return res.json({ status: 'error', error: 'Invalid username' })
        }
        
        console.log(goal_back)
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



// router.get('/:goadId',(req,res,next) => {
//     const id = req.params.goadId;
//     res.status(200).json({
//         message: 'You passes an ID'
//     });
// });


// router.patch('/:goadId',(req,res,next) => {
//     res.status(200).json({
//         message: 'updated product!'
//     });
// });


// router.delete('/:goadId',(req,res,next) => {
//     res.status(200).json({
//         message: 'deleted product!'
//     });
// });























//newstuff

router.get('/',(req, res, next)=>{
    Goal.find()
        .select('name description likes authorId')
        .populate('authorId')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                goals:docs.map(doc =>{
                    return {
                        name: doc.name,
                        description: doc.description,
                        likes: doc.likes,
                        follows: doc.follows,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/user/' + doc.authorId
                        }
                    }
                })
                
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
})

router.post('/',(req, res, next)=>{
    const goal = new Goal({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        authorId: req.body.authorId,
        likes: req.body.likes,
        follows: req.body.follows
    });
    goal.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.get('/:goalId',(req, res, next)=>{
    const id = req.params.goalId;
    if(id === 'special'){
        res.status(200).json({
            message:'you discovered the special id'
        })
    }
    else{
        res.status(200).json({
            message:'you passed an id'
        });
    }
    
});


router.patch('/:goadId',(req,res,next) => {
    res.status(200).json({
        message: 'updated goal!'
    });
});


router.delete('/:goadId',(req,res,next) => {
    res.status(200).json({
        message: 'deleted goal!'
    });
});




module.exports = router;