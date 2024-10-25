// app.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const usersRouter = require("./routers/blogsRouter");
const db = require("./db/queries");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

// passport for user authentication
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views')); // path to .css
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/", usersRouter);

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUser(username);
            // console.log(user);
            // const user = rows[0];
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.username);
});
  
passport.deserializeUser(async (username, done) => {
    try {
        // const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        // const user = rows[0];
        const user = await db.getUser(username);
        done(null, user);
    } catch(err) {
      done(err);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));