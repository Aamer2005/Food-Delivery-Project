import foodModel from "../models/food_model.js";
import fs from "fs";

const addFood = async (req, res) => {
    console.log("Route Hit");

    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file ? req.file.filename : ""
        });

        console.log("Saving...");

        await food.save();

        console.log("Saved");

        res.json({
            success: true,
            message: "Food Added"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//all food list
const listFood = async (req,res) =>{

    try {

        const foods = await foodModel.find({}) //find all foods in foodModel
        res.json({success:true,data : foods})
        
    } catch (error) {
        console.log(error)
        res.json({success:false , message:"Error"})
    }

}

//remove food item
const removeFood = async (req,res)=>{
    try {
        //id automatically created in mongoDB automatically
        const food = await foodModel.findById(req.body.id)//this line used to find food model using id

            if (!food) {
            return res.json({
                success: false,
                message: "Food not found"
            });
        }

        fs.unlink(`uploads/${food.image}`,()=>{}) //this line delete image from the folder uploads

        await foodModel.findByIdAndDelete(req.body.id); //delete food by id

        res.json({success:true,message : "Food Removed"})

    } catch (error) {
        res.json({success:false,message :"Error" })

    }

}

export { addFood ,listFood , removeFood};



// import foodModel from "../models/food_model.js";
// import fs from 'fs';

// //add food item
// const addFood = async (req,res)=>{

//     console.log("Request received");


//     let image_filename = `${req.file.filename}`

//     const food = new foodModel({
//         name : req.body.name,
//         description : req.body.description,
//         price : req.body.price,
//         category : req.body.category,
//         image : image_filename
//     })

//     try {
//         await food.save();
//         res.json({success:true,message:"Food Added"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false , message : "Error , Food Not Added"})
//     }
// }

// export {addFood}