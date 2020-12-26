const express = require('express')
const routes = require('./routes/routes')
const auth = require('./middlewares/auth')
const authConfig = require('./config/auth.json')

const server = express()
const serverSession = require('express-session')

const nunjucks = require('nunjucks')
//const session = require('express-session')

nunjucks.configure('src/views',{
    express:server,
    noCache:true
})


server
.use(express.urlencoded({extended:true}))
.use(serverSession({secret: authConfig.secret, resave:false, saveUninitialized:false, cookie:{maxAge:86400}}))
.use(express.static('public'))
//.use(auth)

.get("/", routes.index)
.get("/home", auth, routes.home)
.get("/user", auth, routes.user)
.post("/signup", routes.signup)
.post("/login", routes.login)
.post("/search", auth, routes.search)
.post("/update", auth, routes.update)

.listen(process.env.PORT || 8080, ()=>{console.log('Working...')})















