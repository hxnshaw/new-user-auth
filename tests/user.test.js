const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const { response } = require("../app");

//THE TEST IS FAILING. THE SHORT TIME FRAME TO GET THE ASSIGNMENT DONE PREVENTED ME FROM FIGURING IT OUT.
// THIS IS MY FIRST TIME WRITING TESTS IN NODEJS, I WILL CONTINUE LEARNING IT.
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "John",
  email: "john@example.com",
  password: "QwertyWhat!",
  age: 30,
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      username: "Henshaw",
      email: "tj@email.com",
      password: "MyNameIsShaw!",
      age: 100,
    })
    .expect(201);
});
