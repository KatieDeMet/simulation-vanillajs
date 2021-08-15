const express = require('express');
const cors = require('cors');
const app = express();
const cntl = require('./controller.js')

app.use(express.json());
app.use(cors());

app.get('/api/users', cntl.getItems)
app.post('/api/users', cntl.addItem)
app.delete('/api/users/:id', cntl.deleteItem)

app.listen(7777, () => console.log("Server is up on lucky number 7!"));