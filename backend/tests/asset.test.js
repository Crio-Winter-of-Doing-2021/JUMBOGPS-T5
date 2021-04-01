const app = require("../src/app");
const Asset = require("../src/models/Asset");
const mongoose = require("mongoose");
const supertest = require("supertest");

const token =
  "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnVsMzY1QGdtYWlsLmNvbSIsImlhdCI6MTYxNzA5NjE2MX0.5TuckzbPnBUjo6x_DpWBCIdT3TswvKptQE_YEk87i88";

describe("Asset End points", () => {
  describe("POST /api/asset", () => {
    test("Create New Asset", async (done) => {
      const data_asset = {
        name: "Black Beauty",
        desc:
          "Driven by Ashok, bought in 2014, used for carrying light weight goods",
        type: "truck",
        image_url:
          "https://i.pinimg.com/originals/7e/9a/4f/7e9a4ff12644542d8ac9e5156007d785.jpg",
        body: {
          modelNo: "Black Beauty XV",
          companyName: "Hyundai",
        },
        lat: 24.3,
        lon: 73.5
      };

      const response = await supertest(app)
        .post("/api/asset")
        .send(data_asset)
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(201);
      expect(response.body.data).not.toBe(null);
      done();
    });
  });
});


// describe("Asset Endpoints", () => { // All Asset Endpoints goes here
//   test("GET /api/asset/list", async (done) => {
//     await supertest(app)
//       .get("/api/asset/list")
//       .set("Authorization", token)
//       .expect(200)
//       .then((response) => {
//         // console.log(response.body);
//         expect(Array.isArray(response.body.data)).toBeTruthy();
//       });
//     done();
//   });
// });

beforeAll((done) => {
    // DB init before all unit tests
    mongoose.connect(
      "mongodb+srv://chypsd:jumbotailtestgps5@cluster0.eoxco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      () => {
        done();
      }
    );
  });
  
  afterAll((done) => {
    // DB close after all unit tests
    mongoose.connection.close();
    done();
  });