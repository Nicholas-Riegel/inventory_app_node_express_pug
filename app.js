const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// db connection
// mongoose.connect(
//     // 'mongodb://127.0.0.1/inventory0',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false
//     },
//     () => console.log('Connected to local mongodb.')
// );
// mongoose.connection.on('error', console.error.bind(console, 'mongodb connection error:'));

// var mongoDB = process.env.dev_db_url;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(mongoDB,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//                 useFindAndModify: false
//             }
//         );
//         console.log('MongoDB-Atlas connection SUCCESS')
//     } catch (err) {
//         console.error(err)
//     }
// }
// connectDB()

const url = process.env.MONGO_URL
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, () => console.log("Server up and running!")))
    .catch((error) => console.log(error.message) )
mongoose.set('useFindAndModify', false)

// sets
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.use('/', require('./routes/index'))

// // listen
// app.listen(3000)