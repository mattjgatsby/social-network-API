# Social-Network-API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This API is built with MongoDB for a social network application where users can share their thoughts, react to their friends' thoughts, and create a friend list. I put this application together to practice using MongoDB, expresss, mongoose, and other technology. 

## Watch the demo!
[DEMO](https://watch.screencastify.com/v/YckZpplOfouhg3rH2gtZ)

## Technology Used
* Express
* MongoDB
* Mongoose

# Code Snippet
In this code snippet, you'll see a method created to get a user based on the id a user gives.

```JavaScript
 getSpecificUser(req, res) {
    User.findOne({ _id: req.params.id })
      .populate("thoughts")
      .populate("friends")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  }
  ```

Here is a schema for our Users which includes a username, email, thoughts array, and friends array.
  ```JavaScript
  const userSchema = new Schema(
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
      getters: true,
    },
  }
);
```

# Author Links
* [GitHub](https://github.com/mattjgatsby)
* [LinkedIn](https://www.linkedin.com/in/matthew-gatsby-1a1521250/)