const express=require('express');
const app=express();
const Article=require('./models/conn');
const method_override=require('method-override');
app.use(method_override('_method'))
app.listen(3000);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

app.get('/',async(req,res)=>{
        const blogs= await Article.find().sort({
            createdAt:'desc'
        })
   res.render('index', {blogs});

})

app.get('/new',async(req,res)=>{

    res.render('new',{ blog:new Article()})
})
const mongoose=require('mongoose');
app.get('/:id',async(req,res)=>{
  try {
    const objectId = mongoose.Types.ObjectId(req.params.id);
    const showingBlog=await Article.findById(objectId)
    res.render('show',{showingBlog})
 
   
    
  } catch (error) {

   
  }
})
app.post('/',async(req,res)=>{
      let blog=new Article({
        title:req.body.title,
        desc:req.body.desc,
        details:req.body.details
      })
      try {
           blog=await blog.save();
           res.redirect(`/${blog.id}`)
      } catch (error) {
      
        res.redirect('new',{blog})
      }
})

app.delete('/:id',async(req,res)=>{
     
          await Article.findByIdAndDelete(req.params.id);
       
          res.redirect('/');
        
})

