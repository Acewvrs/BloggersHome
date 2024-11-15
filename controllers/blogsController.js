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
    
    user = req.user;
    const count = await db.getNumOfBlogs();
    await db.addBlogtoUser(user.username, count);
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
        else {
            await db.createUser(username, password);

            user = {username, password}; // creat user object

            // Automatically log the user in
            req.login(user, (err) => {
                if (err) return next(err);  // Pass error to the next middleware

                // Redirect to home or the user's page
                return res.redirect("/home");
            });
        }
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
    console.log("authenticated: ", req.isAuthenticated());
    if (req.isAuthenticated()) { return next(); }
    res.redirect("/home/login_prompt");
}

// TODO:
async function findAuthorOfBlog(blog_id) {

}

function noAccessPage(req, res) {
    res.render("no_access_to_blog");
}

// if user is accessing their own blog, allow them to edit
// if user is accessing other people's blogs, open it view-only
async function userHasAccess(req, res, next) {
    user = req.user.username;
    const {id} = req.params;

    author = await db.getAuthorOfBlog(id);
    if (author != user) next();
    else res.redirect(`/home/blog/${id}/edit`);
}

async function updateBlog(req, res) {
    const {id} = req.params;
    const {blog_title, content} = req.body;
    date = getCurrentDateStr();

    await db.updateBlog(id, blog_title, date, content);
    res.redirect("/home");
}


async function editBlog(req, res) {
    const {id} = req.params;
    blog = await db.getBlog(id);
    console.log(blog.title, blog.content);
    res.render("edit_blog", {title: blog.title, content: blog.content});
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
    signUpRetryGet,
    userHasAccess,
    noAccessPage,
    editBlog,
    updateBlog
}