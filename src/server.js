const express = require('express')
const server = express()

const pages = require('./routes/pages')
require('./controllers/controller')(server)
const auth = require('./middlewares/auth')

const nunjucks = require('nunjucks')


nunjucks.configure('src/views',{
    express:server,
    noCache:true
})
//como passar o authorizatino

server
.use(express.urlencoded({extended:true}))
.use(express.static('public'))

.get("/", pages.index)
.get("/home", auth, pages.home)
.get("/user", auth, pages.user)
.post("/signup", pages.signup)
.post("/login", pages.login)
.post("/search", auth, pages.search)
.listen(process.env.PORT || 8080, ()=>{console.log('Working...')})















