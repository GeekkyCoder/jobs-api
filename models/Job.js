const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,"plz provide company name"],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,"plz provide position"],
        maxlength:50
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'plz provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('job',jobSchema)
