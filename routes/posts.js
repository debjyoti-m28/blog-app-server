const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE NEW POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE A POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });

                res.status(200).json(updatedPost);
            } catch (arr) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("You can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE A POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete(); // also can use findByIdAndDelete
                res.status(200).json("Post has been deleted succesfully");

            } catch (arr) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("You can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET A POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user; // ?user="debu"
    const catName = req.query.cat; //   ?cat="music"

    try {
        let posts;
        if (username) {
            posts = await Post.find({ username: username });
        }
        else if (catName) {
            posts = await Post.find({categories: { $in: [catName]} }); //chceking in array for a particular category name
        }
        else{
            posts= await Post.find();
        }

        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;