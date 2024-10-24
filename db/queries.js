const pool = require("./pool");

async function createUser(username, password) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", 
    [
      username,
      password
    ]);
}
async function getBlog(id) {
    const blog = await pool.query(`SELECT * FROM blogs WHERE id = ${id}`);
    return blog.rows[0];
}

async function getAllBlogs() {
    const blogs = await pool.query("SELECT * FROM blogs");
    return blogs.rows; // This will return the rows of the query result
}

async function insertBlog(title, date, content) {
    await pool.query("INSERT INTO blogs (title, date, content) VALUES ($1, $2, $3)", [title, date, content]);
    // console.log("done!");
}

async function findUser(username) {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    // console.log(user.rows);
    // console.log(user.rows[0]);
    return user.rows[0];
}

module.exports = {
    getAllBlogs,
    getBlog,
    insertBlog,
    findUser,
    createUser
};