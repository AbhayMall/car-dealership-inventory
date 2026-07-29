const request = require("supertest");
const app = require("../../app");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const createTestUser = async () => {
    const user = {
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "password123"
    };

    await request(app)
        .post("/api/auth/register")
        .send(user);

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: user.email,
            password: user.password
        });

    return response.body.token;
};

const createAdmin = async () => {
    const hashedPassword = await bcrypt.hash(
        "password123",
        10
    );

    const admin = await User.create({
        name: "Admin",
        email: `admin${Date.now()}@example.com`,
        password: hashedPassword,
        role: "admin"
    });

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: admin.email,
            password: "password123"
        });

    return response.body.token;
};

module.exports = {
    createTestUser,
    createAdmin
};