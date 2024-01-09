const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of posts
  const latestPost = await Post.findOne().sort({ timestamp: -1 })

  res.json("index", {
      title: "My Blog",
      c_user: req.user,
      latestPost: latestPost
  });
});

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}, "title text timestamp")
  .sort({ timestamp: -1 })
  .exec();

  res.json("post_list", { title: "All Posts", post_list: allPosts, c_user: req.user });
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

  res.json("post_detail", {
    post: post,
    post_comments: comments,
    c_user: req.user,
  })
});

// Display post create form on GET.
exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.json("post_form", { title: "Create Post", c_user: req.user });
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
  .isLength({ min: 20, max: 200 })
  .escape()
  .withMessage("Post must be between 20-200 characters."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.json("post_form", { title: "Create Post", c_user: req.user, errors: errors.array(), message: req.body })
      return;
    }

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        timestamp: new Date(),
    })

    await post.save();
    res.redirect(post.url);
  })
]

// Display post delete form on GET.
exports.post_delete_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if(post === null) {
    const err = new Error("Post not found.");
    err.status = 404;
    return next(err);
  }

  res.json("post_delete", {
    title: "Delete Post",
    c_user: req.user,
    post: post
  })
});

// Handle post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if(!req.user) {
    res.status(403).send("Unauthorized");
    return;
  }
  
  if(post === null) {
    const err = new Error("Post not found.");
    err.status = 404;
    return next(err);
  } else {
    await Post.findByIdAndDelete(req.body.postid);
    res.redirect("/");
  }
});

// Display post update form on GET.
exports.post_update_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if(post === null) {
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.json("post_form", {
    title: "Update Form",
    c_user: req.user,
    post: post,
  })
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
  .isLength({ min: 20, max: 200 })
  .escape()
  .withMessage("Post must be between 20-200 characters."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.json("post_form", { title: "Create Post", c_user: req.user, errors: errors.array(), message: req.body })
      return;
    }

    const originalPost = await Post.findById(req.params.id);

    // Only a blog poster can edit a post.
    if(!originalPost || !req.user) {
      res.status(403).send("Unauthorized");
      return;
    }

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        timestamp: new Date(),
        _id: req.params.id,
    })
    if(!errors.isEmpty()) {
      res.json("post_form", {
        title: "Update Form",
        post: post,
        c_user: req.user,
        errors: errors.array(),
      })
      return;
    } else {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {});
      res.redirect(updatedPost.url);
    }
  })
]
