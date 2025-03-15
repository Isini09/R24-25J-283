const database = require("../config/db");
const asyncHandler = require("express-async-handler");

const createSystemUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, nic, username, password, confirmpassword } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !nic ||
      !username ||
      !password ||
      !confirmpassword
    ) {
      res.status(400).json({ error: "Required fields must not be empty!" });
    }
  } catch (error) {
    console.error("Error while creating system user:", error);
    res.status(500).json({ error: "Error while creating user" });
  }
});
