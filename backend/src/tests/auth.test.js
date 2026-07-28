const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app");

describe("POST /api/auth/register", ()=> {
    beforeAll(async () => {
        const dbUri = process.env.MONGO_TEST_URI;
        await mongoose.connect(dbUri);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });

    it("should register a new user", async ()=>{
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "abhay@gmail.com",
                password: "password123"
            });
        expect(res.statusCode).toBe(201);
    });

});