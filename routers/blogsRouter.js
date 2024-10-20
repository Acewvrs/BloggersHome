const { Router } = require("express");
const blogsController = require("../controllers/blogsController");
const blogsRouter = Router();

blogsRouter.get("/home", blogsController.homeGet);

blogsRouter.get("/home/blog/new", blogsController.blogCreate); // TODO: change this to POST
// blogsRouter.get("/home/blog/:id", blogsController.blogGet);

module.exports = blogsRouter;