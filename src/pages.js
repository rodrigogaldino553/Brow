const database = require('./database/db')
const newUser = require('./database/create-user')


var user = {}

module.exports = {
    index(req, res) {
        return res.render('index.html')
    },

    async home(req, res) {
        const db = await database
        const users = await db.all(`SELECT name, user, photo, status FROM users WHERE user!="${user.user}";`)
        console.log({ users, user })

        console.log('logged as ' + user.user)

        for (let c = 0; c < users.length; c++) {
            if (users[c].user == user.user) {
                users.splice(c, c)
            }
        }
        console.log(users)

        return res.render('home.html', { users, user })
    },

    async createUser(req, res) {
        const data = req.body
        //data.photo = './assets/padrao.png'//por enquanto q nao arruma o front
        if (data.photo == '') {
            data.photo = './assets/padrao.png'//link de uma foto de perfil padrao
        }
        console.log(data.status)
        if (data.status == '') {
            data.status = "Hey there, I'm using BRO!"
        }
        try {
            const db = await database

            const verify = await db.all(`SELECT * FROM users WHERE user="${data.user}"`)


            if (verify.length > 0) {
                res.send(`ERRO! ${data.user} já existe!`)

            } else {
                await newUser(db, { name: data.name, user: data.user.toLowerCase(), password: data.password, photo: data.photo, status: data.status })
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
                user.name = login[0].name
                user.user = login[0].user
                user.photo = login[0].photo
                user.status = login[0].status


                return res.redirect('/home')
            } else {
                return res.send('DADOS NÃO CONFEREM!')
            }
        } catch (error) {
            console.log(error)
            return res.send('FALHA AO CONSULTAR DADOS!')
        }


    },

    async search(req, res) {
        const data = req.body.data

        try {
            const db = await database
            const results = await db.all(`SELECT * FROM users WHERE name="${data}" OR user="${data}"`)
            const searchInfo = { "name": data, "len": results.length }

            console.log(results, searchInfo)

            if (searchInfo.len > 0) {
                return res.render("search-results.html", { results, searchInfo })

            } else {
                res.send(`<h1>Não existe "${searchInfo.name}" no banco de dados</h1>`)
            }
        } catch (error) {
            res.send("<h1>Houve um erro no banco de dados, tente novamente!</h1>")
        }

    }
}
