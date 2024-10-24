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

function blogCreate(req, res) {
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

async function blogPost(req, res) {
    const {blog_title, content} = req.body;
    date = getCurrentDateStr();
    await db.insertBlog(blog_title, date, content);
    res.redirect("/home");
}

async function signUpGet(req, res) {
    res.render("signup");
}

async function signUpPost(req, res) {
    try {
        const {username, password} = req.body;
        db.createUser(username, password);
        res.redirect("/home");
    } catch(err) {
        // return next(err);
        // TODO:
    }
}

async function loginGet(req, res) {
    res.render("login", {});
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect("/home/log-in");
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
    blog = await db.getBlog(id);
    res.render("view_blog", {title: blog.title, content: blog.content});
}


module.exports = {
    blogGet,
    homeGet,
    signUpGet,
    signUpPost,
    loginGet,
    blogCreate,
    blogPost,
    checkAuthenticated,
    accessBlog
}