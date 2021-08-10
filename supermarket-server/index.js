const express = require('express');
const cors = require('cors');

const users = require('./routes/users');
const auth = require('./routes/auth');


const app = express();
app.use(cors());

const mongoose = require('./db/mongoose');

const PORT = 5500;

app.use(express.json());

// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });



// app.use('/', require('./routes/index'));


app.listen(PORT, () => console.log(`started at port ${PORT}`));