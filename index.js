const express = require("express")
const mongoose = require("mongoose")
const keys = require("./config/keys")
require("./models/TestData")


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
const TestData = mongoose.model("testdata")
app.get("/api", (req, res) => {
    // test it
    new TestData({ name: "test ton thana prod", birthdate: "1996-08-20", testdate: "2021-02-21" }).save()
    res.send({ hi: 'shit' })
})


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
app.listen(PORT)
