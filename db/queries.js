const pool = require("./pool");

async function getBlog(id) {
    const blog  = await pool.query(`SELECT * FROM blogs WHERE ID == ${id}`);
    return blog.row;
}

async function getAllBlogs() {
    const blogs = await pool.query("SELECT * FROM blogs");
    return blogs.rows; // This will return the rows of the query result
}

async function insertBlog(title, date, content) {
    await pool.query("INSERT INTO blogs (title, date, content) VALUES ($1, $2, $3)", [title, date, content]);
    console.log("done!");
}

module.exports = {
    getAllBlogs,
    getBlog,
    insertBlog
};