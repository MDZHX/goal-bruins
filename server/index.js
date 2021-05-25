const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./models/connect.js')
const goal_router = require('./routes/goal.js')
const user_router = require('./routes/user.js')

//All request start with "/goal" will be handled by goal_router
app.use(cors());
app.use('/goal', goal_router)
app.use('/user', user_router)

app.get('/', (req, res) => {
    res.send("Helloworld")
})



app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})


app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});





app.listen(5000, () => {
    console.log('server is listening on port 5000....')
})