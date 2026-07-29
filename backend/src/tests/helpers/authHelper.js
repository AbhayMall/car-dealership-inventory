const request = require("supertest");
const app = require("../../app");

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

module.exports = {
    createTestUser
};