const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { isValidEmail } = require("../utils/validation");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password }) => {

    if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    if (!isValidEmail(email)) {
        throw new Error("Invalid email format");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
        name,
        email,
        password: hashedPassword
    });
};
const loginUser = async ({ email, password }) => {

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token,
        user
    };
};

module.exports = {
    registerUser,
    loginUser
};