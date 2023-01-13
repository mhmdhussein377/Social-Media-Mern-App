const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouters = require("./routers/UserRouters");
const authRouters = require("./routers/Auth");
const postRouters = require("./routers/PostRouters");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB");
});

// middleware
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res
        .status(200)
        .json("File has been uploaded");
});

app.use("/api/users", userRouters);
app.use("/api/auth", authRouters);
app.use("/api/posts", postRouters);

app.listen(process.env.PORT, () => {
    console.log("Backend server is running");
});