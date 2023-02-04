const express = require("express");
const router = express.Router();
const modalController = require("../controllers/modal")

// const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

router.get("/showModal", ensureAuth, modalController.showModal);

// router.post("/createComment/:id", commentsController.createComment);
// router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComments)

module.exports = router;