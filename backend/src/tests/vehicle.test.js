const request = require("supertest");
const app = require("../app");

describe("POST /api/vehicles", () => {

    it("should create a vehicle for authenticated user", async () => {

        const response = await request(app)
            .post("/api/vehicles")
            .set(
                "Authorization",
                "Bearer INVALID_TOKEN"
            )
            .send({
                make: "Toyota",
                model: "Camry",
                category: "Sedan",
                price: 25000,
                quantity: 5
            });

        expect(response.statusCode).toBe(401);

    });

});