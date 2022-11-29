const router = require("express").Router();

const {
  createUser,
  getUsers,
  getSpecificUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").post(createUser).get(getUsers);

router.route("/:id").get(getSpecificUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
