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
    console.log("Rows: ", blogs);
    // console.log("Blogs: ", blogs);
    // res.send("Blogs: " + blogs.map(user => user.username).join(", "));
}

// async function blogUpdate(req, res) {
//     await db.insertBlog("Article #1", "July 10, 2024");
//     // res.send("Blogs: " + blogs.map(user => user.username).join(", "));
// }

async function homeGet(req, res) {
    blogs = await db.getAllBlogs();
    console.log(blogs);
    res.render("home", { blogs: blogs });
};

function blogCreate(req, res) {
    res.render("create_article", {

    });
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

module.exports = {
    blogGet,
    homeGet,
    blogCreate,
    blogPost
}