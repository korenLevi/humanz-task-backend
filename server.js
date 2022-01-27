const express = require('express')
const cors = require('cors')
const expressSession = require('express-session')
const path = require('path')
const app = express()
const http = require('http').createServer(app)





app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080','http://localhost:8081','http://localhost:8081', 'http://127.0.0.1:3035', 'http://localhost:3035'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const clientRoutes = require('./api/client/client.routes')


app.use('/api/client', clientRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3035
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})
