

const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Admin = mongoose.model("admin")


module.exports = app => {
    app.post("/api/adminAuthorise", (req, res, next) => {
        const { password } = req.body
        Admin.find({}).exec().then(doc => {
            const storedHash = doc[0]['password']
            bcrypt.compare(password, storedHash, (err, result) => {
                if (err) next(err)
                if (result) {
                    res.send({ ok: true })
                } else {
                    res.send({ ok: false })
                }
            })
        })
    })
}