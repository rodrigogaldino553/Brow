const express = require('express')
const server = express()


server
.get("/", (req, res)=>{return res.send('<h1>Hello world!</h1>')})
.listen(process.env.PORT || 8080, ()=>{console.log('Working...')})















