
import usermodel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import 'dotenv/config';

// login user
const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await usermodel.findOne({email});
    if (!user) {
      return res.json({success: false, message: "User not found"});
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({success: false, message: "Invalid credentials"});
    }
    
    const token = createToken(user._id);
    res.json({success: true, message: "User logged in successfully", token});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({success: false, message: error.message});
  }
}

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  const {name, password, email} = req.body;
  try {
    const exists = await usermodel.findOne({email});
    if (exists) {
      return res.json({success: false, message: "User already exists"});
    }
    
    // validate email
    if (!validator.isEmail(email)) {
      return res.json({success: false, message: "Invalid email"});
    }
    
    // validate password
    if (password.length < 8) {
      return res.json({success: false, message: "Password must be at least 8 characters"});
    }
    
    // hashing user password
    const salt = await bcrypt.genSalt(10); // Fixed: genSalt instead of gensalt
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user
    const newUser = new usermodel({ // Fixed: use 'new' keyword
      name,
      email,
      password: hashedPassword
    });
    
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({success: true, message: "User registered successfully", token});
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({success: false, message: error.message});
  }
}

export { loginUser, registerUser };