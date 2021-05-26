const jwt = require('jsonwebtoken')
const JWT_SECRET = "IamASecreatCode"

function jwt_userId(token)
{
    const user = jwt.verify(token, JWT_SECRET)
    return user.id
}
module.exports = {jwt_userId, JWT_SECRET}