const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// Require controller modules.
const blogposter_controller = require("../controllers/blogposterController");
const blogpost_controller = require("../controllers/blogpostController");
const blogcomment_controller = require("../controllers/blogcommentController");

// GET home page.
router.get("/", blogpost_controller.index);

/// POSTER ROUTES ///

// GET request for creating a poster. NOTE This must come before routes that display poster (uses id).
router.get("/poster/create", blogposter_controller.poster_create_get);

// POST request for creating poster.
router.post("/poster/create", blogposter_controller.poster_create_post);

// GET request for logging a poster in.
router.get("/poster/login", blogposter_controller.poster_login_get);

// POST request for logging a poster in.
router.post("/poster/login", blogposter_controller.poster_login_post);

// POST request for logging a poster out.
router.post("/poster/logout", blogposter_controller.poster_logout_post);

// GET request to delete poster.
router.get("/poster/:id/delete", blogposter_controller.poster_delete_get);

// POST request to delete poster.
router.post("/poster/:id/delete", blogposter_controller.poster_delete_post);

// GET request to update poster.
router.get("/poster/:id/update", blogposter_controller.poster_update_get);

// POST request to update poster.
router.post("/poster/:id/update", blogposter_controller.poster_update_post);

// GET request for one poster.
router.get("/poster/:id", blogposter_controller.poster_detail);

/// POST ROUTES ///

// GET request for creating post. NOTE This must come before route for id (i.e. display post).
router.get("/post/create", blogpost_controller.post_create_get);

// POST request for creating post.
router.post("/post/create", blogpost_controller.post_create_post);

// GET request to delete post.
router.get("/post/:id/delete", blogpost_controller.post_delete_get);

// POST request to delete post.
router.post("/post/:id/delete", blogpost_controller.post_delete_post);

// GET request to update post.
router.get("/post/:id/update", blogpost_controller.post_update_get);

// POST request to update post.
router.post("/post/:id/update", blogpost_controller.post_update_post);

// GET request for one post.
router.get("/post/:id", blogpost_controller.post_detail);

// GET request for list of all posts.
router.get("/posts", blogpost_controller.post_list);

/// COMMENT ROUTES ///

// GET request for creating comment. NOTE This must come before route for id (i.e. display comment).
router.get("/comment/create", blogcomment_controller.comment_create_get);

// POST request for creating comment.
router.post("/comment/create", blogcomment_controller.comment_create_post);

// GET request to delete comment.
router.get("/comment/:id/delete", blogcomment_controller.comment_delete_get);

// POST request to delete comment.
router.post("/comment/:id/delete", blogcomment_controller.comment_delete_post);

// GET request to update comment.
router.get("/comment/:id/update", blogcomment_controller.comment_update_get);

// POST request to update comment.
router.post("/comment/:id/update", blogcomment_controller.comment_update_post);

// GET request for one comment.
router.get("/comment/:id", blogcomment_controller.comment_detail);

module.exports = router;