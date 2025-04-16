import Users from "../models/Users.js";
import { login } from "./auth.controller.js";

export const getUser = async (req, res) => {
    
    try {
        const users = await Users.findAll({ attributes: { exclude: ['password', 'id', 'createdAt', 'updatedAt'] } });
        res.status(200).json(users);       
    } catch (error) {
        console.error("failed to extract users");
        res.status(400).json({message: "Failed to extract all users", error: error.message });
    }
}

export const getUsersById = async (req, res) => {
    const email = req.user.email; // Get email from URL parameter (e.g. /users/email/:email)
    console.log("email from request: ", email);
    try {

        if(!email){
            return res.status(400).json({ message: "Email is missing from token" });
        }
        const user = await Users.findOne({
            where: { email }, // Query by email
            attributes: { exclude: ['password'], include: ['firstName', 'lastName', 'role', 'email'] }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user", error: err.message });
    }
};