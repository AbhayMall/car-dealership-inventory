const {registerUser} = require("../services/authService");

const register = async (req,res) => {
    try{
        const user = await registerUser(req.body);
        res.status(201).json({
            message : "User registered successfully",
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        });
    }catch(error){
        res.status(400).json({
            message : error.message
        });
    }
};

module.exports = {
    register
};