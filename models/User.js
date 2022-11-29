const { Schema, model } = require("mongoose");
const User = model("User", userSchema);
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: function (dataInput) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(dataInput);
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
module.exports = User;
