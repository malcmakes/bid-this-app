const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
// const Modal = require("../models/Modal");

module.exports = {
    showModal: async (req, res) => {
        try {
            const purchase = await Post.find ({ user: req.user.id });
            res.render("feed.ejs", {
                user: req.user.id,
                price: req.body.price
            })
        } catch (err){
            console.log(err)
        }
    },
};
