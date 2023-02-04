// const Comment = require("../models/Comment");
const Bid = require("../models/Bid");

module.exports = {
  createBid: async (req, res) => {
    try {
      // const commentUser = await User.findById(req.user.id);
      await Bid.create({
        bid: req.body.bid,
        post: req.params.id,
        //USeR name of person that made comment
        createdBy: req.user.userName,
        createdById: req.user.id
      });
      console.log("Bid has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  deleteBid: async (req, res) => {
    try {
      await Bid.deleteOne({_id: req.params.bidid  })
      res.redirect("/post/"+req.params.postid)
    } catch (err) {
      console.log(err)
    }
  },
};
// _id: req.params.commentid