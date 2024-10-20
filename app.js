// app.js
const express = require("express");
const app = express();
const usersRouter = require("./routers/userRouter");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views')); // for using css
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));