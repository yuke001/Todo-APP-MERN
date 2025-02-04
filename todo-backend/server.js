import http from 'http'
import app from './app.js'

let PORT = process.env.PORT || 8000

let server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})