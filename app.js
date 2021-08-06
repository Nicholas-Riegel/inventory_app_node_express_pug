const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const compression = require('compression')
const helmet = require('helmet')

const app = express()

// db connection
const mongoDB = process.env.MONGODB_URI || process.env.dev_db_url;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useFindAndModify: false
            }
        );
        console.log('MongoDB-Atlas connection SUCCESS')
    } catch (err) {
        console.error(err)
    }
}
connectDB()

// sets
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(compression())
app.use(helmet())

app.use('/', require('./routes/index'))

// listen
// app.listen(3000)
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log("Server is running.");
});