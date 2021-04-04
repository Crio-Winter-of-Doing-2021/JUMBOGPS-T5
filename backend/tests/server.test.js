const app = require("../src/app");
const Asset = require("../src/models/Asset");
const mongoose = require("mongoose");
const supertest = require("supertest");

const token =
  "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnVsMzY1QGdtYWlsLmNvbSIsImlhdCI6MTYxNzA5NjE2MX0.5TuckzbPnBUjo6x_DpWBCIdT3TswvKptQE_YEk87i88";



describe("Auth Endpoints", () => { // All Auth Endpoints goes here

  
  test("POST /auth/signup", async (done) => {
    const data = {
      name: "tazril ali",
      email: "taz@gmail.com",
      password: "1234"
    };

    await supertest(app)
      .post("/auth/signup")
      .send(data)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        console.log(response.body);
      });

    done();
  });

  
  test("GET /auth/signin", async (done) => {
    const name = "perul jain";
    const user = {
      email: "perul365@gmail.com",
      password: "12345",
    };
    await supertest(app)
      .post("/auth/signin")
      .send(user)
      .set("Accept", "application/json")
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body.data.name).toBe(name);
        expect(response.body.data.email).toBe(user.email);
        expect(response.body.data.token).not.toBe("");
      });
    done();
  });
});

describe("Asset Endpoints", () => { // All Asset Endpoints goes here
  test("GET /api/asset/list", async (done) => {
    await supertest(app)
      .get("/api/asset/list")
      .set("Authorization", token)
      .expect(200)
      .then((response) => {
        // console.log(response.body);
        expect(Array.isArray(response.body.data)).toBeTruthy();
      });
    done();
  });
});

beforeAll((done) => { // DB init before all unit tests
  mongoose.connect("mongodb+srv://chypsd:jumbotailtestgps5@cluster0.eoxco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => done()
  );
});

afterAll((done) => { // DB close after all unit tests
  mongoose.connection.close();
  done();
});
