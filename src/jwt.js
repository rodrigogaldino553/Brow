const jsontoken = require('jsonwebtoken')


const secret = 'ZHB=G97WR6xqDB=&vJQQR=U@Y5Kp?$VC$L9H92+pLmsF+*dKPUt4MB$YA?m&246H'

function sign(payload) {
    jsontoken.sign(payload, secret, { expiresIn: 84600 })
}
//const sign = payload => jwt.sign(payload, secret, { expiresIn:84600 })
function verify(token){
    jsontoken.verify(token, secret)
}


module.exports = sign
module.exports = verify
