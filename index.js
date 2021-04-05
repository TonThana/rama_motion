const express = require("express")
const mongoose = require("mongoose")
// const bcrypt = require("bcrypt")



const keys = require("./config/keys")
require("./models/TestData")
require("./models/Admin")

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })



const app = express()
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


// routes
require('./routes/testdataRoutes')(app);
require("./routes/adminRoutes")(app)

if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets
    app.use(express.static('client/dist'));

    // express will serve up index.html if does not recognise the route
    const path = require("path")
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}


// // testing password salt + hash
// const saltRounds = 10;
// const password = 'ramatmdp'


// const Admin = mongoose.model("admin")
// bcrypt.hash(password, saltRounds, function (err, hash) {
//     new Admin({ password: hash }).save()
// });


const PORT = process.env.PORT || 5000
console.log(`Listening to port ${PORT}`)
app.listen(PORT)
