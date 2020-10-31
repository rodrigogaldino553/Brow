const express = require('express')
const server = express()

const pages = require('./pages')

const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express:server,
    noCache:true
})

server
.use(express.urlencoded({extended:true}))
.use(express.static('public'))

.get("/", pages.index)
.get("/home", pages.home)
.get("/user", pages.user)
.post("/create-user", pages.createUser)
.post("/login", pages.login)
.post("/search", pages.search)
.listen(process.env.PORT || 8080, ()=>{console.log('Working...')})















