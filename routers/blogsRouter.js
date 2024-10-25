const { Router } = require("express");
const passport = require("passport");
const blogsController = require("../controllers/blogsController");
const blogsRouter = Router();

blogsRouter.get("/home", blogsController.homeGet);

blogsRouter.get("/home/blog/new", blogsController.checkAuthenticated, blogsController.newBlogGet);
// /home/blog/new

blogsRouter.post("/home/blog/new", blogsController.checkAuthenticated, blogsController.newBlogPost);
// blogsRouter.get("/home/blog/:id", blogsController.blogGet);

blogsRouter.get("/home/sign-up", blogsController.signUpGet);
blogsRouter.post("/home/sign-up", blogsController.signUpPost, blogsController.signUpRetryGet);

blogsRouter.get("/home/log-in", blogsController.loginGet);
blogsRouter.post(
    "/home/log-in",
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/home/log-in"
        // failureRedirect: "/home"
    })
);

blogsRouter.get("/home/log-out", blogsController.logout);

blogsRouter.get("/home/blog/:id", blogsController.checkAuthenticated, blogsController.accessBlog); //blogsController.checkAuthenticated, blogsController.accessBlog

blogsRouter.get("/home/login_prompt", blogsController.promptUserLoginGet);

module.exports = blogsRouter;