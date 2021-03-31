

const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Admin = mongoose.model("admin")
const TestData = mongoose.model("testdata")


module.exports = app => {
    app.post("/api/adminAuthorise", (req, res, next) => {
        const { password } = req.body
        Admin.find({}).exec().then(doc => {
            const storedHash = doc[0]['password']
            bcrypt.compare(password, storedHash, (err, result) => {
                if (err) next(err)
                if (result) {
                    // fetch 1st 10 entries (latest date first)
                    TestData.find({}).sort({ servertimestamp: -1 }).limit(10).exec().then(data => {
                        res.send({ ok: true, data })
                    }).catch(next)

                } else {
                    res.send({ ok: false, })
                }
            })
        })
    })
}