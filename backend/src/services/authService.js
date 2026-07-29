const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { isValidEmail } = require("../utils/validation");

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

module.exports = {
    registerUser
};