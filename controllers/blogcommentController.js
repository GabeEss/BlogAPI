const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

// Display list of all comments.
exports.comment_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment list");
});

// Display detail page for a specific comment.
exports.comment_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: comment detail: ${req.params.id}`);
});

// Display comment create form on GET.
exports.comment_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment create GET");
});

// Handle comment create on POST.
exports.comment_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment create POST");
});

// Display comment delete form on GET.
exports.comment_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment delete GET");
});

// Handle comment delete on POST.
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment delete POST");
});

// Display comment update form on GET.
exports.comment_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment update GET");
});

// Handle comment update on POST.
exports.comment_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment update POST");
});
