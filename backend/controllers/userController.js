import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create JWT Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login Request:", req.body);

        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Create token
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log("LOGIN ERROR:");
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= REGISTER =================
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        console.log("Register Request:", req.body);

        // Check if user already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({
                success: false,
                message: "User Already Exists"
            });
        }

        // Validate Email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Validate Password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password should be at least 8 characters"
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Save User
        const user = await newUser.save();

        // Generate Token
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        });

    } catch (error) {

        console.log("REGISTER ERROR:");
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export { loginUser, registerUser };