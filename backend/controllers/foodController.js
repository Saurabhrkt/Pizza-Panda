import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    try {
        // Debug: Log what we're receiving
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);

        // Clean up field names and extract values (handle extra spaces)
        const cleanBody = {};
        Object.keys(req.body).forEach(key => {
            const cleanKey = key.trim();
            cleanBody[cleanKey] = req.body[key];
        });

        console.log("Cleaned body:", cleanBody);

        // Check if image was uploaded
        if (!req.file) {
            return res.json({ success: false, message: "No image uploaded" });
        }

        // Extract cleaned values
        const { name, description, price, category } = cleanBody;

        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.json({ 
                success: false, 
                message: "All fields are required",
                received: { name, description, price, category }
            });
        }

        let image_filename = `${req.file.filename}`;

        const food = new foodModel({
            name: name,
            description: description,
            price: price,
            category: category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });

    } catch (error) {
        console.log("Error adding food item:", error);
        res.json({ success: false, message: "Error adding food item" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log("Error fetching food items:", error);
        res.json({ success: false, message: "Error fetching food items" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Delete image file
        fs.unlink(`uploads/${food.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.log("Error removing food item:", error);
        res.json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, listFood, removeFood };