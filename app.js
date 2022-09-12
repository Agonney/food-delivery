const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv/config'); // Environment variables


// Enable files upload

app.use(fileUpload({
    createParentPath: true
}));
app.use("/uploads", express.static('uploads'))

// Route imports
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const privateRoutes = require('./routes/privateRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')


// Middlewares
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'))
// -> Route Middlewares
app.use('/', homeRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/user', authRoutes);
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)



// Connect to Database
mongoose.connect(process.env.DB_URL, () => {
    console.log('Connected to Database')
})


// Starting the server
app.listen(process.env.PORT, () => {
    console.log(`Application running at http://localhost:${process.env.PORT}/`)
})