const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken')


module.exports = {
    decode(token) {
        let base64url = token.split('.')[1]
        let payload = base64url.replace('-', '+').replace('_', '/')
        let json = Buffer.from(payload, 'base64').toString('ascii')

        return JSON.parse(json)
    },

    isUserValid(username) {
        pattern = /^([a-z0-9_]).{3,12}$/.test(username) //problema com o {4} q define o numeros de caracteres ja tentei {}, {4, }, {4, 12}, {4,}
        
        return pattern
    },

    generateToken(params = {}) {
        return token = jwt.sign(params, authConfig.secret, { expiresIn: 86400 })
    }

}



