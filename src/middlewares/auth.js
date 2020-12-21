const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')


module.exports = (req, res, next) => {
    const authHeader = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.app.get('token')
    
    if(!authHeader){
        return res.status(401).send('No token provided')
    }
    token = authHeader
    /* parts = authHeader.split(' ')

    if(!parts.length === 2){
        return res.status(401).send('Token error')
    }

    const [ scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send('Token malformatted!')
    }*/

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send('Token invalid')

        res.userName = decoded.user
        res.userId = decoded.id
        return next()
    })
}