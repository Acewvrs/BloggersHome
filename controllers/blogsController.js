// exports.usersUpdateGet = (req, res) => {
//     const user = usersStorage.getUser(req.params.id);
//     res.render("updateUser", {
//         title: "Update user",
//         user: user,
//     });
// };

exports.blogUpdateGet = (req, res) => {
    res.render("home", {
        // TODO: pass necessary arguments
    });
    // res.json();
};