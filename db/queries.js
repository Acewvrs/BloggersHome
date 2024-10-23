const pool = require("./pool");

async function getBlog(id) {
  const { rows } = await pool.query("SELECT * FROM blogs");
  return rows;
}

async function insertBlog(title, date, content) {
  await pool.query("INSERT INTO blogs (title, date, content) VALUES ($1, $2, $3)", [title, date, content]);
  console.log("done!");
}

module.exports = {
    getBlog,
    insertBlog
};