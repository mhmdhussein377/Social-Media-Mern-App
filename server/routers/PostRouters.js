const express = require("express");
const { join } = require("path");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();

// create a post
router.post("/", async(req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res
            .status(200)
            .json(savedPost);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

// update a post
router.put("/:id", async(req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            res
                .status(200)
                .json("The post has been udpated");
        } else {
            res
                .status(403)
                .json("You can only update your post");
        }
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

// delete a post
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res
                .status(200)
                .json("The post has been deleted");
        } else {
            res
                .status(403)
                .json("You can only delete your post");
        }
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
})

// like and dislike a post
router.put("/:id/like", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            });
            res
                .status(200)
                .json("You just liked the post");
        } else {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            });
            res
                .status(200)
                .json("You just disliked the post");
        }
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

//get a post
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res
            .status(200)
            .json(post);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

// get a post get timeline posts
router.get("/timeline/:userId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendsPosts = await Promise.all(currentUser.following.map(friendId => {
            return Post.find({userId: friendId});
        }));
        res
            .status(200)
            .json(userPosts.concat(...friendsPosts));
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

// get a user posts
router.get("/profile/:username", async(req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId: user._id});
        res
            .status(200)
            .json(posts);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

// get a post likers
router.get("/post/:postId/likes", async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const postLikers = await Promise.all(post.likes.map((like) => {
            return User.findById(like);
        }));
        res
            .status(200)
            .json(postLikers);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

// get users comments of a post
// router.get("/post/:postId/comments/users", async(req, res) => {
//     try {
//         const post = await Post.findById(req.params.postId);
//         const users = await Promise.all(post.comments.map(comment => {
//             return User.findById(comment.userId);
//         }))
//         res
//             .status(200)
//             .json(users);
//     } catch (error) {
//         res
//             .status(500)
//             .json(error);
//     }
// });

// get comments of a post
router.get("/post/:postId/comments", async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const comments = post.comments;
        const users = await Promise.all(comments.map(comment => {
            return User.findById(comment.userId)
        }));
        const finalResult = [];
        comments.map(comment => {
            finalResult.push({
                text: comment.text,
                createdAt: comment.createdAt,
            })
        });
        users.map((user, index) => {
            finalResult[index].username = user.username;
            finalResult[index].profilePicture = user.profilePicture;
        });
        res.status(200).json(finalResult);
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});


// add a comment to a post
router.put("/post/:postId/comment", async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        await post.updateOne({
            $push: {
                comments: req.body
            }
        })
        res
            .status(200)
            .json("the comment has been added");
    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

module.exports = router;
