const express = require("express");
const router = express.Router();
const bidsController = require("../controllers/bids");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Routes - simplified for now

router.post("/createBid/:id", bidsController.createBid);
router.delete("/deleteBid/:postid/:bidid", bidsController.deleteBid)

// router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComments)


module.exports = router;