// exports.usersUpdateGet = (req, res) => {
//     const user = usersStorage.getUser(req.params.id);
//     res.render("updateUser", {
//         title: "Update user",
//         user: user,
//     });
// };

exports.usersUpdateGet = (req, res) => {
    res.render("home", {
        message: "hi"
    });
    // res.json();
};