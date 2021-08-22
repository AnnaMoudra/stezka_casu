const express = require("express");
const path = require("path");

const app = express();

//original project
//app.use("/js", express.static(path.resolve(__dirname, "frontend", "js")));
//app.use("/img", express.static(path.resolve(__dirname, "frontend", "img")));
//app.use("/style", express.static(path.resolve(__dirname, "frontend", "style")));
//app.get("/frontend", (req, res) => {
//    res.sendFile(path.resolve(__dirname,"frontend", "index.html"));
//});
//

//official site
app.use("/js", express.static(path.resolve(__dirname, "app", "js")));
app.use("/img", express.static(path.resolve(__dirname, "app", "img")));
app.use("/style", express.static(path.resolve(__dirname, "app", "style")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname,"app", "index.html"));
});

app.listen(process.env.PORT || 8080, () => console.log("Server running.."));