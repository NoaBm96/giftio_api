// JSON Web Token is a proposed Internet standard for creating data with optional signature and / or
// optional encryption whose payload holds JSON that asserts some number of claims.
// The tokens are signed either using a private secret or a public / private key.
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// User is a Modle getting from models/user file.
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email, role });
    if (!existingUser)
      return res.status(201).json({ message: "Invalid Email" });
    const existingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingPassword)
      return res.status(201).json({ message: "Invalid Password" });
    const isRoleCorrect = role === existingUser.role;
    if (!isRoleCorrect)
      return res.status(201).json({ message: "Invalid Role" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "120d" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const user = req.body;
  const { email, password } = req.body;
  console.log("Enter");
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(201).json({ message: "Email already exists." });
    const existingPassword = await User.findOne({ password });
    if (existingPassword)
      return res.status(201).json({ message: "Password already exists." });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...user, password: hashPassword });
    console.log(user);
    await newUser
      .save()
      .then(() => {
        console.log("Ok");
      })
      .catch((err) => {
        console.log(err);
      });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "120d",
    });
    console.log("All done");
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
