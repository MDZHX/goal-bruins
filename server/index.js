const express = require('express');
const app = express();
const connection = require('./models/connect.js')
const goal_router = require('./routes/goal.js')
const user_router = require('./routes/user.js')

//All request start with "/goal" will be handled by goal_router
app.use('/goal', goal_router)
app.use('/user', user_router)

app.get('/', (req, res) => {
    res.send("Helloworld")
})


app.listen(5000, () => {
    console.log('server is listening on port 5000....')
})