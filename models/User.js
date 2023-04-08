const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz prvide name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "plz prvide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "plz provide valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "plz prvide password"],
    minlength: 6
  },
});

userSchema.pre("save", async function(next){
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(this.password,salt)
   this.password = hashedPassword
   next()
})

module.exports = mongoose.model("user", userSchema);
