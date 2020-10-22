const createUser = require('./database/create-user')
const database = require('./database/db')
const newUser = require('./database/create-user')


module.exports = {
    index(req, res) {
        return res.render('index.html')
    },

    home(req, res) {
        return res.render('home.html')
    },

    async createUser(req, res) {
        const data = req.body
        data.photo = './assets/padrao.png'//por enquanto q nao arruma o front
        if (data.photo == '') {
            data.photo = './assets/padrao.png'//link de uma foto de perfil padrao
        }
        try {
            const db = await database
            await newUser(db, { name: data.name, user: data.user, password: data.password, photo: data.photo })
        } catch (error) {
            console.log(error)
        }

        res.redirect('/home')
        /*const obj = req.body
        res.send(`<h1>${data.name}</h1><img src="${data.photo}" alt="Padrao">`)*/
    },

    async login(req, res) {
        const data = req.body
        //var login = []
        
        try {
            const db = await database
            const login = await db.all(`SELECT * FROM users WHERE user="${data.user}" AND password="${data.password}";`)//user="${data.name}" FROM users WHERE password="${data.password}";`)

            if(login != undefined){
                console.log(login)
                res.send(`${login[0].name}`)
            }else{
                res.send('DADOS NÃO CONFEREM!')
            }
        } catch (error) {
           console.log(error) 
        }
        
        

        

    }
}
