const database = require('./database/db')
const newUser = require('./database/create-user')


var test = {}

module.exports = {
    index(req, res) {
        return res.render('index.html')
    },

    async home(req, res) {
        const db = await database
        const users = await db.all(`SELECT name, user, photo FROM users`)
        console.log({users, test})
        return res.render('home.html', { users, test })
    },

    async createUser(req, res) {
        const data = req.body
        data.photo = './assets/padrao.png'//por enquanto q nao arruma o front
        if (data.photo == '') {
            data.photo = './assets/padrao.png'//link de uma foto de perfil padrao
        }
        try {
            const db = await database

            const verify = await db.all(`SELECT * FROM users WHERE user="${data.user}"`)
            

            if (verify.length > 0) {
                res.send(`ERRO! ${data.user} já existe!`)

            } else {
                await newUser(db, { name: data.name, user: data.user, password: data.password, photo: data.photo })
                return res.redirect('/')
                
            }
        } catch (error) {
            console.log(error)
            res.send('ERRO AO SALVAR USUARIO')
        }


        /*const obj = req.body
        res.send(`<h1>${data.name}</h1><img src="${data.photo}" alt="Padrao">`)*/
    },

    async login(req, res) {
        const data = req.body

        try {
            const db = await database
            const login = await db.all(`SELECT * FROM users WHERE user="${data.user}" AND password="${data.password}";`)//user="${data.name}" FROM users WHERE password="${data.password}";`)

            if (login.length > 0) {
                test.name = login[0].name
                test.user = login[0].user
                test.photo = login[0].photo


                return res.redirect('/home')
            } else {
                return res.send('DADOS NÃO CONFEREM!')
            }
        } catch (error) {
            console.log(error)
            return res.send('FALHA AO CONSULTAR DADOS!')
        }


    }
}
