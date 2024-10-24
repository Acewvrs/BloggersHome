const { Client } = require("pg");

// add this to script in package.json
const SQL = 
`
DROP TABLE IF EXISTS blogs; 

CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (255),
    date VARCHAR (255),
    content VARCHAR (255)
);

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR (255) PRIMARY KEY,
    password VARCHAR (255),
    blog_id INTEGER
);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: "postgresql://jsong:database11@localhost:5432/blogs",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
  
main();
