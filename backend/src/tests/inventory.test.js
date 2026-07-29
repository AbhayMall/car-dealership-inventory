const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();
const app = require("../app");

const {
    createTestUser,
    createAdmin
} = require("./helpers/authHelper");

describe("Vehicle Purchase", () => {
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

    it("should decrease vehicle quantity after purchase", async () => {
        const token = await createTestUser();

        const createResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 35000,
                quantity: 5
            });

        const vehicleId = createResponse.body._id;

        const purchaseResponse = await request(app)
            .post(`/api/vehicles/${vehicleId}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(purchaseResponse.statusCode).toBe(200);
        expect(purchaseResponse.body.vehicle.quantity).toBe(4);
    });
        it("should reject purchase when vehicle is out of stock", async () => {

    const token = await createTestUser();

    const createResponse = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            make: "BMW",
            model: "X5",
            category: "SUV",
            price: 50000,
            quantity: 0
        });

    const vehicleId = createResponse.body._id;

    const response = await request(app)
        .post(`/api/vehicles/${vehicleId}/purchase`)
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
});
it("should allow admin to restock vehicle", async () => {

    const userToken = await createTestUser();

    const adminToken = await createAdmin();

    const vehicleResponse = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
            make: "Toyota",
            model: "Corolla",
            category: "Sedan",
            price: 20000,
            quantity: 2
        });

    expect(vehicleResponse.statusCode).toBe(201);

    const vehicleId = vehicleResponse.body._id;

    const response = await request(app)
        .post(`/api/vehicles/${vehicleId}/restock`)
        .set(
            "Authorization",
            `Bearer ${adminToken}`
        )
        .send({
            quantity: 5
        });

    expect(response.statusCode).toBe(200);

    expect(response.body.vehicle.quantity).toBe(7);
});
it("should reject vehicle restock by normal user", async () => {

    const userToken = await createTestUser();

    const vehicleResponse = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
            make: "Honda",
            model: "City",
            category: "Sedan",
            price: 18000,
            quantity: 2
        });

    expect(vehicleResponse.statusCode).toBe(201);

    const vehicleId = vehicleResponse.body._id;

    const response = await request(app)
        .post(`/api/vehicles/${vehicleId}/restock`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        )
        .send({
            quantity: 5
        });

    expect(response.statusCode).toBe(403);
});
});