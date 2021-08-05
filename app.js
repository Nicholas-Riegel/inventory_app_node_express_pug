const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// db connection
mongoose.connect(
    // 'mongodb://127.0.0.1/inventory0',
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log('Connected to local mongodb.')
);
mongoose.connection.on('error', console.error.bind(console, 'mongodb connection error:'));
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//                 useFindAndModify: false
//             }
//         );
//         console.log('MongoDB-Atlas connection SUCCESS')
//     } catch (err) {
//         console.error(err)
//         process.exit(1)
//     }
// }
// connectDB()

// sets
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.use('/', require('./routes/index'))

// listen
app.listen(3000)