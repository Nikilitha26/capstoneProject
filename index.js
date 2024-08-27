import express from 'express'
let port = process.env.PORT || 5005
import cors from 'cors'
import peersRouter from './routes/peers.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/peers', peersRouter)


app.listen(port,()=>{
    console.log('http://localhost:'+port);
})