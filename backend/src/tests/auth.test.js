const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();
const app = require("../app");

describe("POST /api/auth/register", ()=> {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        if (mongoose.connection.db) {
            await mongoose.connection.db.dropDatabase();
        }
        await mongoose.disconnect();
        if (mongoServer) await mongoServer.stop();
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

    it("should reject duplicate email", async () => {

    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Abhay",
            email: "duplicate@example.com",
            password: "password123"
        });

    const response = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Another User",
            email: "duplicate@example.com",
            password: "password456"
        });

    expect(response.statusCode).toBe(400);

    expect(response.body.message).toBe("User already exists");

});
it("should reject registration when name is missing", async () => {

    const response = await request(app)
        .post("/api/auth/register")
        .send({
            email: "noname@example.com",
            password: "password123"
        });

    expect(response.statusCode).toBe(400);

});
it("should reject registration when email is missing", async () => {

    const response = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Abhay",
            password: "password123"
        });

    expect(response.statusCode).toBe(400);

});

});