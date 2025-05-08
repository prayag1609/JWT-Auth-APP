var jwt = require("jsonwebtoken");
const nav = [{
    register_user: "POST /user/regi",
    get_user: "GET /user/get",
    get_user_by_id: "GET /user/get/:user_id",
    get_all_users: "GET /alluser",
    delete_user_by_id: "DELETE /user/delete/:user_id"
}]
    exports.check_token = async (req, res, next) => {
        var token = req.headers.authorization;

        if (token == undefined) {
            res.status(400).json({
                message: "token is missing...",
                Navigation:nav
            });
        } else {
            jwt.verify(token, "JWT_INTERVIEW_2025", function (err, decoded) {
                if (err) {
                    res.status(200).json({
                        message: "token is invalid or expired...",
                        Navigation:nav
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        }
    };
