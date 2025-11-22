import request from "supertest";
import app from "../server.js";

describe("Bug API", () => {
  it("should create a bug", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "Sample Bug" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Sample Bug");
  });
});
