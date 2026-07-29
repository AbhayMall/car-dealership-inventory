const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();
const app = require("../app");

const registerAndLoginUser = async (userData) => {
    await request(app)
        .post("/api/auth/register")
        .send(userData);

    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
            email: userData.email,
            password: userData.password
        });

    return loginResponse.body.token;
};

describe("Vehicle API", () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    beforeEach(async () => {
        if (mongoose.connection.db) {
            await mongoose.connection.db.dropDatabase();
        }
    });

    afterAll(async () => {
        if (mongoose.connection.db) {
            await mongoose.connection.db.dropDatabase();
        }
        await mongoose.disconnect();
        if (mongoServer) await mongoServer.stop();
    });

    it("should reject invalid token when creating a vehicle", async () => {
        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", "Bearer INVALID_TOKEN")
            .send({
                make: "Toyota",
                model: "Camry",
                category: "Sedan",
                price: 25000,
                quantity: 5
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Invalid or expired token");
    });

    it("should create a vehicle for an authenticated user", async () => {
        const token = await registerAndLoginUser({
            name: "Vehicle User",
            email: "vehicleuser@example.com",
            password: "password123"
        });

        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Honda",
                model: "Accord",
                category: "Sedan",
                price: 28000,
                quantity: 3
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({
            make: "Honda",
            model: "Accord",
            category: "Sedan",
            price: 28000,
            quantity: 3
        });
    });

    it("should list vehicles for authenticated user", async () => {
        const token = await registerAndLoginUser({
            name: "List User",
            email: "listuser@example.com",
            password: "password123"
        });

        await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Ford",
                model: "Mustang",
                category: "Coupe",
                price: 50000,
                quantity: 2
            });

        const response = await request(app)
            .get("/api/vehicles")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toMatchObject({
            make: "Ford",
            model: "Mustang"
        });
    });

    it("should purchase a vehicle and decrement quantity", async () => {
        const token = await registerAndLoginUser({
            name: "Purchase User",
            email: "purchaseuser@example.com",
            password: "password123"
        });

        const createResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Nissan",
                model: "Altima",
                category: "Sedan",
                price: 22000,
                quantity: 4
            });

        expect(createResponse.statusCode).toBe(201);

        const vehicleId = createResponse.body._id;

        const purchaseResponse = await request(app)
            .post(`/api/vehicles/${vehicleId}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(purchaseResponse.statusCode).toBe(200);
        expect(purchaseResponse.body.vehicle.quantity).toBe(3);
    });

    it("should deny restock for non-admin users", async () => {
        const token = await registerAndLoginUser({
            name: "Restock User",
            email: "restockuser@example.com",
            password: "password123"
        });

        const createResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Chevrolet",
                model: "Camaro",
                category: "Coupe",
                price: 45000,
                quantity: 1
            });

        const vehicleId = createResponse.body._id;

        const response = await request(app)
            .post(`/api/vehicles/${vehicleId}/restock`)
            .set("Authorization", `Bearer ${token}`)
            .send({ quantity: 5 });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("Admin access required");
    });
});