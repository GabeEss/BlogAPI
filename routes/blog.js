const express = require("express");
const router = express.Router();

// Require controller modules.
const blogposter_controller = require("../controllers/blogposterController");
const blogpost_controller = require("../controllers/blogpostController");
const blogcomment_controller = require("../controllers/blogcommentController");

// GET home page.
router.get("/", blogpost_controller.index);

/// POSTER ROUTES ///

// POST request for logging a poster in.
router.post("/poster/login", blogposter_controller.poster_login_post);

// GET request for logging a poster out.
router.get("/poster/logout", blogposter_controller.poster_logout_get);

/// POST ROUTES ///

// POST request for creating post.
router.post("/post/create", blogpost_controller.post_create_post);

// POST request to delete post.
router.post("/post/:id/delete", blogpost_controller.post_delete_post);

// POST request to update post.
router.post("/post/:id/update", blogpost_controller.post_update_post);

// GET request for one post.
router.get("/post/:id", blogpost_controller.post_detail);

// GET request for list of all posts.
router.get("/posts", blogpost_controller.post_list);

/// COMMENT ROUTES ///

// POST request for creating comment.
router.post("/post/:id/create", blogcomment_controller.comment_create_post);

// POST request to delete comment.
router.post("/comment/:id/delete", blogcomment_controller.comment_delete_post);

// GET request for one comment.
router.get("/comment/:id", blogcomment_controller.comment_detail);

module.exports = router;