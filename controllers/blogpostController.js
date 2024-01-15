const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of posts
  const latestPost = await Post.findOne().sort({ timestamp: -1 })

  res.json({
      title: "My Blog",
      latestPost: latestPost
  });
});

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}, "title text timestamp")
  .sort({ timestamp: -1 })
  .exec();

  res.json({ title: "All Posts", post_list: allPosts});
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();
  const comments = await Comment.find({ post: req.params.id }, "text timestamp owner").exec();
  if(post === null) {
    const err = new Error("post not found");
    err.status = 404;
    return next(err);
  }

  res.json({
    post: post,
    post_comments: comments,
  })
});

// Handle post create on POST.
exports.post_create_post = [
  // Validate and sanitize the username field.
  body("title")
  .trim()
  .isLength({ min: 3, max: 25 })
  .escape()
  .withMessage("Title must be between 3-25 characters."),
  body("text")
  .trim()
  .isLength({ min: 6, max: 200 })
  .escape()
  .withMessage("Post must be between 6-200 characters."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ success: "false", errors: errors.array() });      
    }

    if (!req.user) {
      return res.status(403).json({ success: false, errors: ["Not authenticated"], user: req.user });
    }

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        timestamp: new Date(),
    })

    const savedPost = await post.save();
    return res.status(201).json({ success: "true", post: savedPost });
  })
]

// Handle post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();
  const comments = await Comment.find({ post: req.params.id }, "text timestamp owner").exec();
  
  if(!req.user) {
    return res.status(403).json({success: false, errors: ["Not a user"]});
  }

  if(post === null) {
    const err = new Error("Post not found.");
    err.status = 404;
    return next(err);
  }

  if(comments.length > 0) {
    return res.json({success: false});
  } else {
    await Post.findByIdAndDelete(req.params.id);
    return res.json({success: true});
  }
});

// Handle post update on POST.
exports.post_update_post = [ 
  // Validate and sanitize the username field.
  body("title")
  .trim()
  .isLength({ min: 3, max: 25 })
  .escape()
  .withMessage("Title must be between 3-25 characters."),
  body("text")
  .trim()
  .isLength({ min: 6, max: 200 })
  .escape()
  .withMessage("Post must be between 6-200 characters."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ success: "false", errors: errors.array() });
    }

    if(!req.user) {
      return res.status(403).json({success: false, errors: ["Not a user"]});
    }

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        timestamp: new Date(),
        _id: req.params.id,
    })
    
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {});
    return res.status(201).json({ success: "true", post: updatedPost });
  })
]