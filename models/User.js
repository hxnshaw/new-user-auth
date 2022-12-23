const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "USERNAME NOT AVAILABE, PLEASE CHOOSE ANOTHER."],
      required: [true, "PLEASE ENTER YOUR USERNAME"],
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "EMAIL ADDRESS IS REQUIRED"],
      trim: true,
      unique: [true, "EMAIL ADDRESS NOT AVAILABE, PLEASE CHOOSE ANOTHER."],
      validate: {
        validator: validator.isEmail,
        message: "PLEASE ENTER A VALID EMAIL ADDRESS",
      },
    },
    password: {
      type: String,
      required: [true, "PLEASE ENTER YOUR PASSWORD"],
      trim: true,
      minlength: 7,
    },
    age: {
      type: Number,
      required: [true, "PLEASE ENTER YOUR AGE"],
      validate(value) {
        if (value < 18) {
          throw new Error("YOU MUST BE 18 AND ABOVE TO REGISTER");
        }
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    approval_status: {
      type: String,
      enum: ["reject", "approval", "suspend"],
      default: "reject",
    },
  },
  { timestamps: true }
);

//Compare password
UserSchema.methods.comparePassword = async function (userPassword) {
  const user = this;
  const isMatch = await bcrypt.compare(userPassword, user.password);
  return isMatch;
};

//hash password
UserSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
