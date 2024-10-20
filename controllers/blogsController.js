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

async function blogUpdate(req, res) {
    await db.insertBlog("Article #1", "July 10, 2024");
    // res.send("Blogs: " + blogs.map(user => user.username).join(", "));
}

function homeGet(req, res) {
    res.render("home", {
        // TODO: pass necessary arguments
    });
};

function blogCreate(req, res) {
    res.render("create_article", {

    });
}

module.exports = {
    blogGet,
    blogUpdate,
    homeGet,
    blogCreate
}