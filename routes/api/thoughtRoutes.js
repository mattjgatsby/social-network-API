const router = require("express").Router();

const {
  createThought,
  getThoughts,
  getSpecificThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").post(createThought).get(getThoughts);

router
  .route("/:thoughtId")
  .get(getSpecificThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
