const database = require('./database/db')
const newUser = require('./database/create-user')
const bcrypt = require('bcrypt')


var user = {}

module.exports = {
    index(req, res) {
        return res.status(200).render('index.html')
    },

    async home(req, res) {
        const db = await database
        const users = await db.all(`SELECT name, user, photo, status FROM users WHERE user!="${user.user}";`)
      

        for (let c = 0; c < users.length; c++) {
            if (users[c].user == user.user) {
                users.splice(c, c)
            }
        }

        return res.status(200).render('home.html', { users, user })
    },

    async createUser(req, res) {
        const data = req.body
        //data.photo = './assets/padrao.png'//por enquanto q nao arruma o front
        if (data.photo == '') {
            data.photo = './assets/padrao.png'//link de uma foto de perfil padrao
        }
        
        if (data.status == '') {
            data.status = "Hey there, I'm using BRO!"
        }
        try {
            const db = await database

            const verify = await db.all(`SELECT * FROM users WHERE user="${data.user}"`)


            if (verify.length > 0) {
                res.status(403).send(`ERRO! ${data.user} já existe!`)

            } else {
                const hash = bcrypt.hashSync(data.password, 3)
                await newUser(db, { name: data.name, user: data.user.toLowerCase(), password: hash, photo: data.photo, status: data.status })
                return res.status(200).redirect('/')

            }
        } catch (error) {
            console.log(error)
            res.status(500).send('ERRO! NÃO FOI POSSÍVEL CADASTRAR USUÁRIO')
        }

    },

    async login(req, res) {
        const data = req.body

        try {
            const db = await database
            const login = await db.all(`SELECT * FROM users WHERE user="${data.user.toLowerCase()}";`) // AND password="${data.password}";`)//user="${data.name}" FROM users WHERE password="${data.password}";`)
            const userHash = login[0].password
            
            const isValid = bcrypt.compareSync(data.password, userHash)

            if (isValid) {
                user.name = login[0].name
                user.user = login[0].user
                user.photo = login[0].photo
                user.status = login[0].status


                return res.status(200).redirect('/home')

            } else {
                return res.status(403).send('DADOS NÃO CONFEREM!')
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send('FALHA AO CONSULTAR DADOS!')
        }


    },

    async search(req, res) {
        const data = req.body.data

        try {
            const db = await database
            const results = await db.all(`SELECT * FROM users WHERE name="${data}" OR user="${data}"`)
            const searchInfo = { "name": data, "len": results.length }

            
            if (searchInfo.len > 0) {
                return res.status(200).render("search-results.html", { results, searchInfo })

            } else {
                res.status(404).send(`<h1>Não existe "${searchInfo.name}" no banco de dados</h1>`)
            }
        } catch (error) {
            res.status(503).send("<h1>Houve um erro no banco de dados, tente novamente!</h1>")
        }

    },

    user(req, res) {
        return res.status(200).render("user.html", { user })
    }
}
