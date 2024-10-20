const { Router } = require("express");
const userController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/home", userController.usersUpdateGet);

module.exports = usersRouter;