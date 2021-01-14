
const express = require('express')
const path = require('path')

const app = express()
const PORT = 80

app.use('/', express.static(path.join(__dirname, '/dist/')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})
app.listen(PORT, function () {
    console.log(`Messenger app listen on port ${PORT}!`)
})
