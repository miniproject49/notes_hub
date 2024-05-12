const User = require("../models/User");

exports.register = async (req, res) => {
  console.log(
    "Register API request received :",
    req.body.username,
    req.body.password
  );
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("User already exists :", { existingUser });
      return res.status(400).json({ message: "Username already exists" });
    }

    // If user doesn't exist, create a new user
    const user = await User.create({ username, password });
    console.log("User created :", { user });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  console.log(
    "Login API request received :",
    req.body.username,
    req.body.password
  );
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      console.log("Login successful :", { user });
      res.json({ message: "Login successful" });
    } else {
      console.log("Login failed :", { username, password });
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
