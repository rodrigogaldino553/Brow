const express = require('express')
const server = express()

const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express:server,
    noCache:true
})

server
.use(express.urlencoded({extended:true}))
.use(express.static('public'))

.get("/", (req, res)=>{return res.render('index.html')})
.listen(process.env.PORT || 8080, ()=>{console.log('Working...')})















