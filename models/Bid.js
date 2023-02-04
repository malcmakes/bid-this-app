const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  bid: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    ref: "User"
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bid", BidSchema);




