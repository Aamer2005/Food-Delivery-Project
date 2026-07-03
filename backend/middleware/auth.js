import jwt from "jsonwebtoken"

const authMiddleWare = async (req,res,next) => {
    const {token} = req.headers;

    //if we don't give token from user
    if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }

    try {
        //to decode token we required JWT_SECRET
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        //this middleware takes token convert in userid and 
        // using this token we can add ,remove and get data in the cart
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleWare;