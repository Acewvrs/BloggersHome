// exports.usersUpdateGet = (req, res) => {
//     const user = usersStorage.getUser(req.params.id);
//     res.render("updateUser", {
//         title: "Update user",
//         user: user,
//     });
// };
const db = require("../db/queries");

async function blogGet(req, res) {
    const blogs = await db.getBlog(1);
    // console.log("Blogs: ", blogs);
    // res.send("Blogs: " + blogs.map(user => user.username).join(", "));
}

// async function blogUpdate(req, res) {
//     await db.insertBlog("Article #1", "July 10, 2024");
//     // res.send("Blogs: " + blogs.map(user => user.username).join(", "));
// }

async function homeGet(req, res) {
    authenticated = req.isAuthenticated();
    blogs = await db.getAllBlogs();
    res.render("home", { blogs: blogs, logged_in: authenticated });
};

function newBlogGet(req, res) {
    res.render("create_blog");
}

function getCurrentDateStr() {
    const dateObj = new Date();
    const month   = dateObj.getUTCMonth();
    const day     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();
    const date = new Date(year, month, day);
    const month_str = date.toLocaleString('default', { month: 'long' });
    date_string = month_str + " " + day + ", " + year;
    return date_string;
}

async function newBlogPost(req, res) {
    const {blog_title, content} = req.body;
    date = getCurrentDateStr();
    await db.insertBlog(blog_title, date, content);
    // TODO: add blog id to user in users

    
    res.redirect("/home");
}

async function signUpGet(req, res) {
    res.render("signup", {duplicate_username: false});
}

async function signUpRetryGet(req, res) {
    res.render("signup", {duplicate_username: true});
}

async function signUpPost(req, res, next) {
    try {
        const {username, password} = req.body;
        exist = await db.usernameExists(username);
        
        if (exist) {
            return next();
        }
        await db.createUser(username, password);
        res.redirect("/home");
    } catch(err) {
        // return next(err);
        // TODO:
    }
}

async function loginGet(req, res) {
    res.render("login", {});
}

// checks if user is logged-in and prompts to log in if not
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect("/home/login_prompt");
}

// TODO:
async function findAuthorOfBlog(blog_id) {

}
// TODO:
function userHasAccess(req, res) {
    // if (checkAuthenticated)
    user = req.user;
    
    // if (user.username == )
    console.log(user);
}

async function accessBlog(req, res) {
    const {id} = req.params;
    // author = await db.getAuthorOfBlog(id);
    // console.log(author);
    blog = await db.getBlog(id);
    res.render("view_blog", {title: blog.title, content: blog.content});
}

function logout(req, res) {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/home");
    });
}

function promptUserLoginGet(req, res) {
    res.render("login_prompt");
}

module.exports = {
    blogGet,
    homeGet,
    signUpGet,
    signUpPost,
    loginGet,
    newBlogGet,
    newBlogPost,
    checkAuthenticated,
    accessBlog,
    logout,
    promptUserLoginGet,
    signUpRetryGet
}