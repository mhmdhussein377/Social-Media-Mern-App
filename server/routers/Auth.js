const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("./../models/User");

router.post("/register", async(req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword});
        const user = await newUser.save();
        res
            .status(200)
            .json(user);
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        !user && res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json("Wrong password");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
