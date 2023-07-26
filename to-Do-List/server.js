const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "/to-Do-List")))

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" || password === "password") {
        res.json({ success: true });
    } else {
        res.json({success: false });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})