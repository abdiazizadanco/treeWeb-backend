const http = require('http')
const app = require('./app')
const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

const server = http.createServer(app)
server.listen(port, () => {
    console.log(`Listening for requests on port ${port}`);
})
