const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

// mongoose middleware docs 
//  runs before the doc is saved into database , this refers to the document here!
userSchema.pre("save", async function(){
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(this.password,salt)
   this.password = hashedPassword 
})

userSchema.methods.createJWT = function (){
  return jwt.sign({userId:this._id,name:this.name},process.env.SECRET_KEY,{expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(candidatePassword){
   return await bcrypt.compare(candidatePassword,this.password)
}

module.exports = mongoose.model("user", userSchema);
