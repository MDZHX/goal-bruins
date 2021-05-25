const express = require('express');
const router = express.Router()
const connection = require('../models/connect.js')
const User = require('../models/user')
const Goal = require('../models/goal');
const mongoose = require('mongoose');
router.use(express.json())

// --------------------------------------latest version---------------------------------------//

router.post('/new-user', (req,res,next)=>{
    /*
    required body elements:
        username
        password
    procedure:
        created a new user with no goals associated
    */
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        goals_created: [],
        goals_followed: [],
    });
    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Creating New User',
                createdUser: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});




router.patch("/follow-goal",(req,res,next) =>{
    /*
    required body elements:
        userId
        goalId
    procedure:
        add a goal to a user's goals_followed array
    */
    // const {userId, goalId} = req.body;
    User.update(
            {_id: req.body.userId },
            // {$set: {password: "12345"}}
            {$push: {goals_followed : req.body.goalId}}
        )
        .exec()
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })
});



router.patch("/create-goal", async (req,res,next) =>{
    /*
    required body elements:
        userId
        goal_name
        goal_description
    procedure:
        add a goal to the goal collection, also add it to the user's goals_created array
    */
    const {userId, goal_name, goal_description} = req.body;

    const goal = new Goal({
        _id: mongoose.Types.ObjectId(),
        name: req.body.goal_name,
        description: req.body.goal_description,
        authorId: req.body.userId
    })

    const goalId = goal._id;

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

    User.update({_id: req.body.userId },{$push: {goals_created : goalId}})
        .exec()
        .exec()
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })
});






router.get('/show-followed', async (req,res,next)=>{
    /*
    required body elements:
        userId
    procedure:
        add a goal to the goal collection, also add it to the user's goals_created array
    */
    followed_array = [];
    result_array = [];

    await User.findById(req.body.userId)
        .exec()
        .then(doc =>{
            followed_array = doc.goals_followed;
        })
        .catch(err => {
            console.log(err);
        })
    
    for (var i = 0; i < followed_array.length; i++) {
        var current_goal_id = followed_array[i];
        await Goal.findById(current_goal_id)
            .exec()
            .then((doc) => {
                result_array.push(doc);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    console.log(result_array);
    res.send(result_array);
});





router.get('/show-created', async (req,res,next)=>{
    /*
    required body elements:
        userId
    procedure:
        add a goal to the goal collection, also add it to the user's goals_created array
    */
    created_array = [];
    result_array = [];

    await User.findById(req.body.userId)
        .exec()
        .then(doc =>{
            created_array = doc.goals_created;
        })
        .catch(err => {
            console.log(err);
        })
    
    for (var i = 0; i < created_array.length; i++) {
        var current_goal_id = created_array[i];
        await Goal.findById(current_goal_id)
            .exec()
            .then((doc) => {
                result_array.push(doc);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    console.log(result_array);
    res.send(result_array);
});














// -------------------------------------hard coded examples----------------------------------------//


// router.get('/add-user', (req, res) =>{
//     const user = new User({
//         username: 'Bryan',
//         password: '12345',
//         created: ['60ac4d4da67e779a1e0159dd','60ac4d6f3a6ba99a288b0e68'],
//         followed: [],
        
//     })

//     user.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })

// })



router.get('check-user',(req,res,next) => {
    User.findById('60ac4e6d00143b9a3a9906d7')
        // .select('goals_user_created')
        .populate('goals_user_created')
})














router.get('/list-goals', (req, res) =>{
    const user = new User({
        username: 'Bryan',
        password: '12345',
        created: ['60ac4d4da67e779a1e0159dd','60ac4d6f3a6ba99a288b0e68'],
        followed: [],
        
    })

    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })

})


router.get('/single-user',(req,res) => {
    User.findById('60ac4e6d00143b9a3a9906d7')       //this is just an example, replace this with variable id
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})



router.get('/list-goals',(req,res) => {
    User.findById('60ac4e6d00143b9a3a9906d7')       //this is just an example, replace this with variable id
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})







// 60ac4e6d00143b9a3a9906d7














//newstuff
router.get('/', (req,res,next)=>{
    User.find()
        .exec()
        .then(docs =>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});


// router.post('/', (req,res,next)=>{
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         username: req.body.username,
//         password: req.body.password,
//         goals_user_created: req.body.goals_user_created,
//         goals_user_followed: req.body.goals_user_followed,
//     });
//     user
//         .save()
//         .then(result => {
//             console.log(result);
//             res.status(201).json({
//                 message:'Handeling POST requests to /users',
//                 createdUser: result
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error:err
//             })
//         });
// });



router.get('/:userId', (req,res,next)=>{
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.patch("/:userId",(req,res,next) =>{
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({_id: id },{$set: updateOps})
        .exec()
        .then(res => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        })

});







router.delete('/:userId', (req,res,next)=>{
    const id = req.params.userId;
    User.remove({_id: id })
        .exec()
        .then(res => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});





















module.exports = router;
