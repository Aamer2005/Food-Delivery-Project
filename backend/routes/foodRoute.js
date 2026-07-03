import express from "express";
import multer from "multer";
import { addFood , listFood ,removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Storage Engine
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }

});

const upload = multer({
    storage: storage
});

foodRouter.post(
    "/add",
    upload.single("image"),
    addFood
);

foodRouter.get(
    "/list",
    listFood
)

foodRouter.post("/remove",removeFood)

export default foodRouter;