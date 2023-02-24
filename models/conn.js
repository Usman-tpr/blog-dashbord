const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/blogArticles');
mongoose.set('strictQuery', false);

const articleschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    details:{
        type:String
    },
    createdAt:{
              type:Date,
              default:Date.now
    }

});

module.exports=mongoose.model('Article',articleschema)