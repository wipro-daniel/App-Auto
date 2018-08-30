const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    appName:{type:String, required:true},
    hcParam:{type:String,required:true},
    hcDesc:{type:String,required:true},
    hcStat:{type:String,required:true}
});

module.exports=mongoose.model('Post',postSchema);