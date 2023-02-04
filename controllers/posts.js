const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Bid = require("../models/Bid")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, location: req.url });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      // const bids = await Bid.find({ postId: req.params.id }).sort({ createdAt: "desc" }).lean();

      const bids = await Bid.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();


      // const bids = await Bid.find({ postId: req.params.id });
      // res.render('post', { post: post, bid: bid });
      // res.render("post.ejs", { post: post, user: req.user, comments:comments, bids:bids });

      res.render("post.ejs", { post: post, user: req.user, comments:comments, bids:bids, location: req.url });
      console.log(bids.length);
      
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        price: req.body.price,
        category: req.body.category,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  getModal: async (req, res) => {
    try {
      const bodyParser = require('body-parser');
      app.use(bodyParser.urlencoded());
      const show_modal = req.body.modal; // Cast to boolean
      res.render("page", { show_modal });
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
