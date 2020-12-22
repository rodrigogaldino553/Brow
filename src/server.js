const express = require('express')
const routes = require('./routes/routes')
const auth = require('./middlewares/auth')


const server = express()
const nunjucks = require('nunjucks')

nunjucks.configure('src/views',{
    express:server,
    noCache:true
})


server
.use(express.urlencoded({extended:true}))
.use(express.static('public'))

.get("/", routes.index)
.get("/home", auth, routes.home)
.get("/user", auth, routes.user)
.post("/signup", routes.signup)
.post("/login", routes.login)
.post("/search", auth, routes.search)

.listen(process.env.PORT || 8080, ()=>{console.log('Working...')})















