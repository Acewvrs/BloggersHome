const pool = require("./pool");

async function getBlog(id) {
  const { rows } = await pool.query("SELECT * FROM blogs");
  return rows;
}

async function insertBlog(title, date) {
  await pool.query("INSERT INTO blogs (title, date) VALUES ($1, $2)", [title, date]);
  console.log("done!");
}

module.exports = {
    getBlog,
    insertBlog
};