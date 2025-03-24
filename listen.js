const db = require("./db/connection")
const app = require("./app")

const {port = 9090}=process.env
app.listen(port, (err) => {
    if (err) console.log("Failed to connect to port", port)
    else console.log("Connected to port", port)
})

module.exports = app