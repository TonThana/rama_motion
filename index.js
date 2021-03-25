const express = require("express")
const mongoose = require("mongoose")

const keys = require("./config/keys")
require("./models/TestData")

// const { example } = require("./models/example_testdata_db")


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })



const app = express()
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


// routes
require('./routes/testdataRoutes')(app);



// app.get("/", (req, res) => {
//     res.send({ hi: "server" })
// })


if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets
    app.use(express.static('client/dist'));

    // express will serve up index.html if does not recognise the route
    const path = require("path")
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000
console.log(`Listening to port ${PORT}`)
app.listen(PORT)
