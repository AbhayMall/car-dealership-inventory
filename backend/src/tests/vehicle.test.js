const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();
const app = require("../app");

const {
    createTestUser,
    createAdmin
} = require("./helpers/authHelper");;

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

    it("should create a vehicle for authenticated user", async () => {

    const token = await createTestUser();

    const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            make: "Toyota",
            model: "Camry",
            category: "Sedan",
            price: 25000,
            quantity: 5
        });

    expect(response.statusCode).toBe(201);

    expect(response.body.make).toBe("Toyota");
});

   it("should get all vehicles for authenticated user", async () => {

    const token = await createTestUser();

    const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
});

    it("should get a vehicle by id for authenticated user", async () => {
        const token = await createTestUser();

        const createResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 22000,
                quantity: 3
            });

        expect(createResponse.statusCode).toBe(201);

        const vehicleId = createResponse.body._id;

        const response = await request(app)
            .get(`/api/vehicles/${vehicleId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(vehicleId);
        expect(response.body.make).toBe("Toyota");
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
    it("should reject vehicle creation without authentication", async () => {
    const response = await request(app)
        .post("/api/vehicles")
        .send({
            make: "Toyota",
            model: "Camry",
            category: "Sedan",
            price: 25000,
            quantity: 5
        });

    expect(response.statusCode).toBe(401);
});
it("should search vehicles by make", async () => {

    const token = await createTestUser();

    await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
            make: "Honda",
            model: "Civic",
            category: "Sedan",
            price: 22000,
            quantity: 3
        });

    const response = await request(app)
        .get("/api/vehicles/search?make=Honda")
        .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBeGreaterThan(0);

    expect(response.body[0].make).toBe("Honda");
});
it("should allow admin to delete a vehicle", async () => {

    const userToken = await createTestUser();

    const adminToken = await createAdmin();

    const vehicleResponse = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
            make: "Ford",
            model: "Mustang",
            category: "Sports",
            price: 45000,
            quantity: 2
        });

    expect(vehicleResponse.statusCode).toBe(201);

    const vehicleId = vehicleResponse.body._id;

    const deleteResponse = await request(app)
        .delete(`/api/vehicles/${vehicleId}`)
        .set(
            "Authorization",
            `Bearer ${adminToken}`
        );

    expect(deleteResponse.statusCode).toBe(200);
});
it("should reject vehicle deletion by normal user", async () => {

    const userToken = await createTestUser();

    const vehicleResponse = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
            make: "Ford",
            model: "Focus",
            category: "Hatchback",
            price: 20000,
            quantity: 2
        });

    expect(vehicleResponse.statusCode).toBe(201);

    const vehicleId = vehicleResponse.body._id;

    const response = await request(app)
        .delete(`/api/vehicles/${vehicleId}`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );

    expect(response.statusCode).toBe(403);
});
});