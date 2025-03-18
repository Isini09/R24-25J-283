const mongoose = require("mongoose");
require("dotenv").config();
const express = require('express');


const connectMongoDb = async() => {
    console.log("MongoDB URI:", process.env.MONGO_URI);

    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Failed to connect to MongoDB", err));

    express().get("/", (req, res) => {
      res.send("Mongo DB is connected.");
    });
};

module.exports = {connectMongoDb};