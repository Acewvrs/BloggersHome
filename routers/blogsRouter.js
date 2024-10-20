const { Router } = require("express");
const blogsController = require("../controllers/blogsController");
const blogsRouter = Router();

blogsRouter.get("/home", blogsController.blogUpdateGet);

module.exports = blogsRouter;