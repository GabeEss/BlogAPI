const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');

// Display detail page for a specific comment.
exports.comment_detail = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).populate('post');

  if(comment === null) {
    const err = new Error("comment not found");
    err.status = 404;
    return next(err);
  }

  res.json({
    comment: comment,
  })
});

// Handle comment create on POST.
exports.comment_create_post = [ 
  // Validate and sanitize form.
  body("text")
  .trim()
  .isLength({ min: 3, max: 200 })
  .escape()
  .withMessage("Text must be between 3-200 characters."),
  body("owner")
  .trim()
  .isLength({ min: 3, max: 50 })
  .escape()
  .withMessage("Your name must be between 3-50 characters."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ success: "false", errors: errors.array() });      
    }

    const post = await Post.findById(req.params.id).exec();

    const comment = new Comment({
      text: req.body.text,
      timestamp: new Date(),
      owner: req.body.owner,
      post: post,
    })

    await comment.save();
    return res.status(201).json( { success: "true", comment: comment } );
  })
]

// Handle comment delete on POST.
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).exec();

  if(!req.user) {
    return res.status(403).json({success: false, errors: ["Not a user"]});
  }

  if(comment === null) {
    const err = new Error("Comment not found");
    err.status = 404;
    return next(err);
  } else {
    await Comment.findByIdAndDelete(req.params.id);
    return res.json({success: "true"});
  }
});