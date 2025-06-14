const express = require("express");
const db = require("./db");
const dotenv = require("dotenv");
dotenv.config({});

const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./Routes/User");
const Message = require("./Routes/message");
const { app, server, io } = require("./socket/socket");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", User);
app.use("/", Message);

server.listen(3000, () => {
  console.log(`Server listening on port ${3000}`);
});
