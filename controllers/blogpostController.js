const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of posts
  const latestPost = await Post.findOne().sort({ timestamp: -1 })

  res.render("index", {
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

  res.render("post_list", { title: "All Posts", post_list: allPosts, c_user: req.user });
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

  res.render("post_detail", {
    post: post,
    post_comments: comments,
    c_user: req.user,
  })
});

// Display post create form on GET.
exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post create GET");
});

// Handle post create on POST.
exports.post_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post create POST");
});

// Display post delete form on GET.
exports.post_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post delete GET");
});

// Handle post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post delete POST");
});

// Display post update form on GET.
exports.post_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post update GET");
});

// Handle post update on POST.
exports.post_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post update POST");
});
