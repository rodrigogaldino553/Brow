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
.post("/create-user", pages.createUser)
.listen(process.env.PORT || 8080, ()=>{console.log('Working...')})















