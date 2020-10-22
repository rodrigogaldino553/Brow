const createUser = require('./database/create-user')
const database = require('./database/db')
const newUser = require('./database/create-user')


module.exports = {
    index(req, res){
        return res.render('index.html')
    },

    async createUser(req, res){
        const data = req.body

        const db = await database
        await newUser(db, {name: data.name, user: 'rgr205', password: data.password, photo: '.png'})
        /*const obj = req.body*/
        res.send(`<h1>${data.name}</h1>`)
    }
}
