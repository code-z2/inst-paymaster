import request from "supertest";
import app from "../src/app";

describe("Test the base path", () => {
    test("It should response the base route does not exist", (done) => {
        request(app)
            .get("/")
            .then((response) => {
                expect(response.statusCode).toBe(404);
                done();
            });
    });
});
