const express = require("express");
const path = require("path");

const app = express();

var app_dir = './../stezka_casu'
app.use("/js", express.static(path.resolve(app_dir, "app", "js")));
app.use("/img", express.static(path.resolve(app_dir, "app", "img")));
app.use("/style", express.static(path.resolve(app_dir, "app", "style")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(app_dir,"app", "index.html"));
});

app.listen(process.env.PORT || 8000, () => console.log("NodeJS server running.."));