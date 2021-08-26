const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const cntl = require('./controller.js')
const port =  process.env.PORT || 7777

app.use(express.json());
app.use(cors());
app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/api/users', cntl.getItems)
app.post('/api/users', cntl.addItem)
app.delete('/api/users/:id', cntl.deleteItem)

app.listen(port, () => console.log(`Server is up on lucky ${port}`));