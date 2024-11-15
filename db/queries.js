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

async function updateBlog(id, title, date, content) {
  await pool.query("UPDATE blogs SET title = $1, date = $2, content = $3 WHERE id = $4", [title, date, content, id]);
}

async function getUser(username) {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    // console.log(user.rows);
    // console.log(user.rows[0]);
    return user.rows[0];
}

async function getAuthorOfBlog(blog_id) {
  const author = await pool.query("SELECT username FROM authors WHERE blog_id = $1", [blog_id]);
  return author.rows[0].username;
}

async function usernameExists(username) {
  const user = await pool.query("SELECT username FROM users WHERE username = $1", [username]);
  return (user.rows.length != 0);
}

async function getNumOfBlogs() {
  const result = await pool.query("SELECT COUNT(*) FROM blogs");
  count = parseInt(result.rows[0].count, 10);
  return count;
}

async function addBlogtoUser(username, blog_id) {
  await pool.query("INSERT INTO authors (username, blog_id) VALUES ($1, $2)", [username, blog_id]);
}

module.exports = {
    getAllBlogs,
    getBlog,
    insertBlog,
    updateBlog,
    getUser,
    createUser,
    getAuthorOfBlog,
    usernameExists,
    addBlogtoUser,
    getNumOfBlogs
};