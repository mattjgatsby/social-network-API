const { User, Thought } = require("../models");
const { Types } = require("mongoose");

module.exports = {
  getSpecificUser(req, res) {
    User.findOne({ _id: req.params.id })
      .populate("thoughts")
      .populate("friends")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.updateOne({ _id: req.params.id }, { username: req.body.username })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.deleteOne({ _id: req.params.id })
      .then((user) => {
        // Thought.deleteMany({ _id: id});
        return res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { friends: { _id: Types.ObjectId(req.params.friendId) } },
      },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findByIdAndUpdate(req.params.id, {
      $pull: { friends: Types.ObjectId(req.params.friendId) },
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
