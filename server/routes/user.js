const express = require('express');
const router = express.Router()
const connection = require('../models/connect.js')
const User = require('../models/user')
const Goal = require('../models/goal');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const {JWT_SECRET, jwt_userId} = require('./jwt.js')
router.use(express.json())

// --------------------------------------latest version---------------------------------------//

router.post('/new-user', (req,res,next)=>{
    /*
    required body elements:
        username
        password
    procedure:
        created a new user with no goals associated

    Tested------------------------Yes!
    */

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        goals_created: [],
        goals_followed: [],
        goals_liked: [],
    });

    user.save(function(err) {
        if (err) {
            console.log('Error!');
            if (err.code === 11000) {
            console.log('User already exist!');
            return res.status(500).send(
                { 
                    succes: false, 
                    message: 'User already exist!' 
                });
          }
          return res.status(500).send(err);
        }
    
        res.json({
          success: true
        });
    
    });
});


router.post('/login', async (req, res) => {
    /*
    required body elements:
        username
        password
    procedure:
        allow user to login, returns a token that could be used by jwt to extract userId

    Tested------------------------Yes!
    */
    const { username, password } = req.body
    await User.findOne({username: `${username}`}, (err, user) =>{
        if(err){
            res.status(403).json({
                status:403,
                message: 'Wrong username'
            })
        }
        if(user.password === password){
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username
                },
                JWT_SECRET
            )
    
            return res.json({
              status: 200,
              data: token
            })
        }
        res.status(403).json({
            status:403,
            message: 'Wrong password'
        })
    })
})


router.patch("/create-goal", async (req,res,next) =>{
    /*
    required body elements:
        jwt_token
        goal_name
        goal_description
    procedure:
        add a goal to the goal collection, also add it to the user's goals_created array

    Tested------------------------Yes!
    */
    const user_id = jwt_userId(req.body.jwt_token);

    const goal = new Goal({
        _id: mongoose.Types.ObjectId(),
        name: req.body.goal_name,
        description: req.body.goal_description,
        authorId: user_id,
    })

    const goalId = goal._id;



    await goal.save(function(err) {
      if (err) {
          console.log('Error!');
          if (err.code === 11000) {
          console.log('Goal with the same name already exist!');
          return res.status(500).send(
              { 
                  succes: false, 
                  message: 'Goal with the same name already exist!' 
              });
        }
        return res.status(500).send(err);
      };

      goal_successfully_created = true;

      res.json({
        success: true
      });
    });

    if(goal_successfully_created){
      User.update({_id: user_id },  {$push: {goals_created : goalId}},  {$push: {goals_followed : goalId}})
        .exec()
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
});

router.patch("/follow-goal", async (req,res,next) =>{
    /*
    required body elements:
        jwt_token
        goalId
    procedure:
        add a goal to a user's goals_followed array

    Tested------------------------Yes!
    */
    const user_id = jwt_userId(req.body.jwt_token);


    await User.findById(user_id)
        .exec()
        .then((doc) => {
            already_followed = doc.goals_followed.includes(req.body.goalId)
        })

    if(!already_followed){
        User.update(
            {_id: user_id },
            {$push: {goals_followed : req.body.goalId}}
        )
        .exec()
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })

        await Goal.findById(req.body.goalId) 
        .exec()
        .then((doc) => {
            cur_follows = doc.follows
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json({
                status:'Fail',
                message: 'goal does not exist'
            })
        })

        Goal.update({_id:req.body.goalId}, {$set:{follows:Math.max(cur_follows,0)+1}})      //increment the number of likes
        .exec()
        .then((doc) => {
            console.log(doc);
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })

    } else {
        console.log("goal already followed")
        res.status(403).json({
            status:'Fail',
            message: 'goal already followed'
        })
    }
});


router.patch("/unfollow-goal", async (req,res,next) =>{
    /*
    required body elements:
        jwt_token
        goalId
    procedure:
        remove a goal from a user's goals_followed array

    Tested------------------------Yes!
    */
    const user_id = jwt_userId(req.body.jwt_token);


    await User.findById(user_id)
        .exec()
        .then((doc) => {
            already_followed = doc.goals_followed.includes(req.body.goalId)
        })


    if(already_followed){
        User.update(
            {_id: user_id },
            {$pull: {goals_followed : req.body.goalId}}
        )
        .exec()
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })

        await Goal.findById(req.body.goalId) 
        .exec()
        .then((doc) => {
            cur_follows = doc.follows
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json({
                status:'Fail',
                message: 'goal does not exist'
            })
        })

        Goal.update({_id:req.body.goalId}, {$set:{follows:Math.max(cur_follows,1)-1}})      //increment the number of likes
        .exec()
        .then((doc) => {
            console.log(doc);
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })

    } else{
        console.log("goal was not followed")
        res.status(403).json({
            status:'Fail',
            message: 'goal was not followed'
        })
    }
    
    
});


router.patch("/like-goal", async (req,res,next) =>{
    /*
    required body elements:
        jwt_token
        goalId
    procedure:
        add a goal to a user's goals_liked array, also increment the likes field in goal by 1

    Tested------------------------Yes!
    */

    const user_id = jwt_userId(req.body.jwt_token);

    await User.findById(user_id)
        .exec()
        .then((doc) => {
            already_liked = doc.goals_liked.includes(req.body.goalId)
        })

    
    if(!already_liked){

        User.update(
            {_id: user_id },
            {$push: {goals_liked : req.body.goalId}}
        )
        .exec()
        .then((doc) => {
            console.log(doc)
        })
        .catch((err) => {
            console.log(err);
        })

        await Goal.findById(req.body.goalId)        //get the number of likes
        .exec()
        .then((doc) => {
            cur_likes = doc.likes
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json({
                status:'Fail',
                message: 'goal does not exist'
            })
        })


        Goal.update({_id:req.body.goalId}, {$set:{likes:Math.max(cur_likes,0)+1}})      //increment the number of likes
        .exec()
        .then((doc) => {
            console.log(doc);
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })

    }  else {
        console.log("goal already liked")
        res.status(403).json({
            status:'Fail',
            message: 'goal already liked'
        })
    }
    
});




router.patch("/unlike-goal", async (req,res,next) =>{
    /*
    required body elements:
        jwt_token
        goalId
    procedure:
        add a goal to a user's goals_liked array, also increment the likes field in goal by 1

    Tested------------------------Yes!
    */

    const user_id = jwt_userId(req.body.jwt_token);

    await User.findById(user_id)
        .exec()
        .then((doc) => {
            already_liked = doc.goals_liked.includes(req.body.goalId)
        })


    if(already_liked){
        User.update(
            {_id: user_id },
            {$pull: {goals_liked : req.body.goalId}}  
        )
        .exec()
        .then((doc) => {
            console.log(doc)
        })
        .catch((err) => {
            console.log(err);
        })


        await Goal.findById(req.body.goalId)
        .exec()
        .then((doc) => {
            cur_likes = doc.likes
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json({
                status:'Fail',
                message: 'goal does not exist'
            })
        })
    
        Goal.update({_id:req.body.goalId}, {$set:{likes:Math.max(cur_likes,1)-1}})
        .exec()
        .then((doc) => {
            console.log(doc);
            res.send(doc)
        })
        .catch((err) => {
            console.log(err);
        })

    } else {
        console.log("goal was not liked")
        res.status(403).json({
            status:'Fail',
            message: 'goal was not liked'
        })
    }
    
});










router.get('/show-followed', async (req,res,next)=>{
    /*
    required body elements:
        jwt_token
    procedure:
        return all the goals that are in the user's goals_followed array

    Tested------------------------Yes!
    */

    const user_id = jwt_userId(req.body.jwt_token);


    followed_array = [];
    liked_array = [];
    result_array = [];


    await User.findById(user_id)
        .exec()
        .then((doc) =>{
            followed_array = doc.goals_followed;
            liked_array = doc.goals_liked;
        })
        .catch(err => {
            console.log(err);
        })
    
    for (var i = 0; i < followed_array.length; i++) {
        var current_goal_id = followed_array[i];
        var liked = liked_array.includes(current_goal_id)
        await Goal.findById(current_goal_id)
            .lean()
            .then((doc) => {
                doc['followed'] = true;
                doc['liked'] = liked;
                result_array.push(doc);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    console.log(result_array);
    res.send(result_array);
});


router.get('/show-liked', async (req,res,next)=>{
    /*
    required body elements:
        jwt_token
    procedure:
        return all the goals that are in the user's goals_liked array

    Tested------------------------Yes!
    */

    const user_id = jwt_userId(req.body.jwt_token);


    followed_array = [];
    liked_array = [];
    result_array = [];


    await User.findById(user_id)
        .exec()
        .then(doc =>{
            followed_array = doc.goals_followed;
            liked_array = doc.goals_liked;
        })
        .catch(err => {
            console.log(err);
        })
    
    for (var i = 0; i < liked_array.length; i++) {
        var current_goal_id = liked_array[i]
        var followed = followed_array.includes(current_goal_id)
        await Goal.findById(current_goal_id)
            .lean()
            .then((doc) => {
                doc['followed'] = followed;
                doc['liked'] = true;
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
        jwt_token
    procedure:
        return all the goals that are in the user's goals_created array

    Tested------------------------Yes!
    */
    const user_id = jwt_userId(req.body.jwt_token);


    created_array = [];
    result_array = [];
    followed_array = [];
    liked_array = [];

    await User.findById(user_id)
        .exec()
        .then(doc =>{
            created_array = doc.goals_created;
            followed_array = doc.goals_followed;
            liked_array = doc.goals_liked;
        })
        .catch(err => {
            console.log(err);
        })
    
    for (var i = 0; i < created_array.length; i++) {
        var current_goal_id = created_array[i];
        var followed = followed_array.includes(current_goal_id);
        var liked = liked_array.includes(current_goal_id);
        await Goal.findById(current_goal_id)
            .lean()
            .then((doc) => {
                doc['followed'] = followed;
                doc['liked'] = liked;
                result_array.push(doc);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    console.log(result_array);
    res.send(result_array);
});


router.get('/discover-page', async (req,res,next)=>{
    /*
    required body elements:
        jwt_token
    procedure:
        rank all the goals in the database by the number of likes they have, return the top 20 liked goals

    Tested------------------------Yes!
    */
    const user_id = jwt_userId(req.body.jwt_token);

    goal_array = [];
    result_array = [];
    followed_array = [];
    liked_array = [];

    await User.findById(user_id)
        .exec()
        .then(doc =>{
            followed_array = doc.goals_followed;
            liked_array = doc.goals_liked;
        })
        .catch(err => {
            console.log(err);
        })
    
    // Create a temp variable "discover_rank" to select the goals that go on the top
    await Goal.updateMany([
        {$addFields:{discover_rank:{$add: ["$follows", "$follows", "$likes"]}}}])

    await Goal.find()
        .sort([['discover_rank',-1]])
        .limit(20).exec()
        .then(result => {
            goal_array = result;
        })
        .catch(err => {
            console.log(err);
        });

    // UNCOMMENT LATER: Keep discover rank variable for now for debugging purposes
    // await Goal.updateMany([{$unset:{discover_rank:""}}])

    for (var i = 0; i < goal_array.length; i++) {
        var current_goal_id = goal_array[i]._id;
        var followed = followed_array.includes(current_goal_id);
        var liked = liked_array.includes(current_goal_id);
        await Goal.findById(current_goal_id)
            .lean()
            .then((doc) => {
                doc['followed'] = followed;
                doc['liked'] = liked;
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
