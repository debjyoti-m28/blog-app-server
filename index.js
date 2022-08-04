const express = require("express");
const app= express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "/images")));

//MONGODB CONNECTION
const connect = () => {
    mongoose.connect("mongodb+srv://debjyoti28:debjyoti28@cluster0.guezclp.mongodb.net/blog?retryWrites=true&w=majority")
.then(console.log("connected to MONGODB"))
.catch((err)=> console.log(err));
}

//UPLOAD IMAGES
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"images");
    },
    filename: (req,file,cb)=>{
        cb(null,req.body.name);
    }
});
const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded.");
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.listen( process.env.PORT || 5000 , ()=>{
    connect();
    console.log("backend is running...");
});