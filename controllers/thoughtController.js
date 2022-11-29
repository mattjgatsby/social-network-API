const { User, Thought, Reaction } = require("../models");

module.exports = {
  createThought(req, res) {
    Thought.create(req.body)
      .then(async (thought) => {
        await User.findByIdAndUpdate(req.body.userId, {
          $addToSet: { thoughts: thought._id },
        });
        return res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getSpecificThought(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, {
      thoughtText: req.body.thoughtText,
    })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, {
      $addToSet: {
        reactions: {
          reactionBody: req.body.reactionBody,
          username: req.body.username,
        },
      },
    })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, {
      $pull: {
        reactions: { reactionId: Types.ObjectId(req.params.reactionId) },
      },
    })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};
