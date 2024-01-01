const Poster = require("../models/poster");
const asyncHandler = require("express-async-handler");

// Display list of all posters.
exports.poster_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster list");
});

// Display detail page for a specific poster.
exports.poster_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: poster detail: ${req.params.id}`);
});

// Display poster create form on GET.
exports.poster_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster create GET");
});

// Handle poster create on POST.
exports.poster_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster create POST");
});

// Display poster login form on GET.
exports.poster_login_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster login GET");
});

// Handle poster login on POST.
exports.poster_login_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster login POST");
});

// Handle poster logout on POST.
exports.poster_logout_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster logout POST");
});

// Display poster delete form on GET.
exports.poster_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster delete GET");
});

// Handle poster delete on POST.
exports.poster_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster delete POST");
});

// Display poster update form on GET.
exports.poster_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster update GET");
});

// Handle poster update on POST.
exports.poster_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: poster update POST");
});
