const { Router } = require("express");
const blogsController = require("../controllers/blogsController");
const blogsRouter = Router();

blogsRouter.get("/home", blogsController.homeGet);

blogsRouter.get("/home/blog/new", blogsController.blogCreate); // TODO: change this to POST
// /home/blog/new

blogsRouter.post("/home/blog/new", blogsController.blogPost);
// blogsRouter.get("/home/blog/:id", blogsController.blogGet);

module.exports = blogsRouter;