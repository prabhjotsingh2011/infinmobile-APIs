const express = require('express');
const DbConnect = require('./database')
const router = require('./router')
var bodyParser = require('body-parser')
const app = express();


DbConnect()

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(router)

app.listen(8000, () => {
    console.log('server started at 8000');
})