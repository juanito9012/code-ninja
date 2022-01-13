const express = require('express')
const app = express();
const morgan = require(`morgan`)


//Settings
app.set(`port`, process.env.PORT || 3000)
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/users',require('./routes/users'))

//Starting Server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server on port 3000')
})