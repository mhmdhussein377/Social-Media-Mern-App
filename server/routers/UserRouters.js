const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.put("/:id", async(req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {;
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res
                    .status(500)
                    .json(error);
            }
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            // maybe json(updatedUser);
            res
                .status(200)
                .json("Account has been updated");
        } catch (error) {
            res
                .status(500)
                .json(error);
        }
    } else {
        res
            .status(403)
            .json("You can only update your account");
    }
});

router.delete("/:id", async(req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            // maybe json(updatedUser);
            res
                .status(200)
                .json("Account has been deleted");
        } catch (error) {
            res
                .status(500)
                .json(error);
        }
    } else {
        res
            .status(403)
            .json("You can only delete your account");
    }
});

router.get("/", async(req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username});
        const {
            password,
            updatedAt,
            ...others
        } = user._doc;
        res
            .status(200)
            .json(others);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

router.put("/:id/follow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $push: {
                        following: req.params.id
                    }
                })
                res
                    .status(200)
                    .json("User has been followed");
            } else {
                res
                    .status(403)
                    .json("You already following the user");
            }
        } catch (error) {
            res
                .status(500)
                .json(error);
        }
    } else {
        res
            .status(403)
            .json("you can't follow yourself");
    }
});

router.put("/:id/unfollow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $pull: {
                        following: req.params.id
                    }
                });
                res
                    .status(200)
                    .json("User has been unfollowed");
            } else {
                res
                    .status(403)
                    .json("You are not following the user");
            }
        } catch (error) {
            res
                .status(500)
                .json(error);
        }
    } else {
        res
            .status(403)
            .json("you can't unfollow yourself");
    }
});

// get following users
router.get('/friends/:userId', async (req, res) => {
    
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(user.following.map(friendId => {
            return User.findById(friendId);
        }));
        let friendsList = [];
        friends.map(friend => {
            const {username, profilePicture, _id} = friend;
            friendsList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendsList);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;