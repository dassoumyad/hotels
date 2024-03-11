const mongoose=require("mongoose");
const URI=process.env.DB_url;

const connectDb= async () =>{
    try {
        await mongoose.connect(URI)
        console.log("connection successfully");
        
    } catch (error) {
        console.log("databse connection failed");
        process.exit(0);
    }
}
module.exports=connectDb;