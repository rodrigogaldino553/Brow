const database = require('../database/db')
const newUser = require('../database/create-user')
const bcrypt = require('bcrypt')
const jwt = require('../controllers/jwt')


module.exports = {
    index(req, res) {
        return res.status(200).render('index.html')
    },

    async home(req, res) {
        const token = req.app.get('token')
        let userPayload =  jwt.decode(token)
        const db = await database

        let user = await db.all(`SELECT name, user, photo, status FROM users WHERE id=${userPayload.id} AND user="${userPayload.user}";`)
        const users = await db.all(`SELECT name, user, photo, status FROM users WHERE user<>"${userPayload.user}";`)
        user = user[0]

        return res.status(200).render('home.html', { users, user })
    },

    async signup(req, res) {
        const data = req.body

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
                res.status(400).send(`ERRO! ${data.user} já existe!`)

            } else {
                let hash = bcrypt.hashSync(data.password, 3)
                let username = data.user.toLowerCase().replace(/ /g, '_')

                if (jwt.isUserValid(username)) {
                    await newUser(db, { name: data.name, user: username, password: hash, photo: data.photo, status: data.status })
                    
                    let id = await db.all(`SELECT id FROM users WHERE user="${username}";`)
                    var token = jwt.generateToken({ user: username, id: id })
                    req.app.set('token', token)
                    
                    return res.status(200).redirect('/home')

                } else {
                    return res.status(400).send("ERRO! NOME DE USUARIO INVALIDO, USE APENAS [a-z] [0-9] _ E PERMITIDO 4-12 CARACTERES")
                }

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
                let id = login[0].id
                let user = login[0].user

                let token = jwt.generateToken({ user: user, id: id })
                req.app.set('token', token)

                return res.status(200).redirect(`/home`)

            } else {
                return res.status(403).send('DADOS NÃO CONFEREM! senha ou usuario incorreto')
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
            const results = await db.all(`SELECT * FROM users WHERE name LIKE "%${data}%" OR user LIKE "%${data}%"`)
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

    async user(req, res) {
        const token = req.app.get('token')
        let userPayload =  jwt.decode(token)

        const db = await database
        let user = await db.all(`SELECT name, user, photo, status FROM users WHERE id=${userPayload.id} AND user="${userPayload.user}";`)
        user = user[0]

        return res.status(200).render("user.html", { user })
    }
}
