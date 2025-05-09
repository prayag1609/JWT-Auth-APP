const user_model = require("../model/user_model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const nav = [{
    register_user: "POST /user/regi",
    get_user: "GET /user/get",
    get_user_by_id: "GET /user/get/:user_id",
    get_all_users: "GET /alluser",
    delete_user_by_id: "DELETE /user/delete/:user_id"
}]

////////////////////////
// users home
exports.user_home = async(req,res) =>{
    res.status(200).json({
        status:"welcome to JWT auth_app...",
        navigation:nav
    })
}

////////////////////////
// add users and generate token
exports.user_regi = async(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var dob = req.body.dob;


    if(!name || !email || !password || !dob){
        return res.status(400).json({
            status: "please fill all details like name, email, password and dob..."
        });
    }
 
    var name_check = /^[A-Za-z\s]+$/.test(name);
    if(!name_check){
        return res.status(400).json({
            status: "please insert valid name..."
        });
    }

    var email_check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!email_check){
        return res.status(400).json({
            status: "please insert valid mail..."
        });
    }

    var dob_check = /^\d{2}-\d{2}-\d{4}$/.test(dob);
    if(!dob_check){
        return res.status(400).json({
            status: "DOB must be in DD-MM-YYYY format..."
        });
    }

    var user_data = await user_model.find({email:email})

    if(user_data.length != 0){
       return res.status(400).json({
           status:"please use different mail..."
        })
    }
    var bcrypt_password = await bcrypt.hash(password, 10);
    var user_new_data = {
        name:name,
        email: email,
        password: bcrypt_password,
        dob:dob
    };

    var data = await user_model.create(user_new_data);

    const token = jwt.sign(
        { userId: data._id }, 
        "JWT_INTERVIEW_2025", 
        { expiresIn: "7d" } 
    );

    res.status(201).json({
        status: "user register success-fully....",
        token: token,
        navigation:nav
    });
}
////////////////////////
// get user by JWT token
exports.user_get = async (req, res) => {
    var user_id = req.user.userId;

    var user_data = await user_model.findById(user_id, { password: 0 });

    if (user_data == null) {
        res.status(404).json({
            status: "user not found...",
            navigation:nav
        });
    } else {
        res.status(200).json({
            data:user_data,
            navigation:nav
        });
    }
};
////////////////////////
// get user by Id and token 
exports.get_user_by_id = async (req, res) => {
    var user_id = req.params.user_id;  

    if (!user_id) { 
        return res.status(400).json({ 
            status: "user_id is required",
            navigation:nav
        });
    }

    var user = await user_model.findById(user_id, { password: 0 });
    if (!user) {
        return res.status(404).json({ 
            status: "user not found",
            navigation:nav
        });
    }

    res.status(200).json({
        data: user,
        navigation:nav
    });  
};
////////////////////////
// get all users by token
exports.get_all_user = async (req, res) => {
    var data = await user_model.find().select("-password");

    res.status(200).json({
        user_list: data,
        navigation:nav
    });
}
////////////////////////
// delete user by Id and token
exports.delete_user_by_id = async (req, res) => {
    var user_id = req.params.user_id;

    if (!user_id) {
        res.status(200).json({
            message: "user_id is required",
            navigation:nav
        });
    } else {
        var user = await user_model.findByIdAndDelete(user_id);

        if (user == null) {
            res.status(200).json({
                message: "user not found",
                navigation:nav
            });
        } else {
            res.status(200).json({
                message: "user deleted successfully",
                navigation:nav
            });
        }
    }
};
