const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AuthUtil = require("../utils/authUtil");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be provided!"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email must be provided!"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided!"],
      minlength: 6,
    },
    roles: {
      type: [String],
      enum: ["user", "super_user", "admin"],
      default: ["user"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await AuthUtil.createHashedPassword(this.password);
});

module.exports = mongoose.model("User", userSchema);
