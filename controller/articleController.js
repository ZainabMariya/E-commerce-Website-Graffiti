// Import articles Schema
const Article=require('../model/article')
const { validationResult } = require('express-validator');

const open_article_form = (request, response) => { 
  response.render('add_article_form', { title: 'Add Article',errors: []});
  
}
const add_article = (request, response)=>{
  const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return  response.render('add_article_form', {title: 'Add Article', errors: errors.array()});
    }
    let name = request.body.name;
    let color = request.body.color;
    let price=request.body.price;
    
    let article = new Article({name:name,color:color,price:price})
    
    article.save()
    .then((data)=>{        
      console.log(`Article saved to database: id -> ${data._id}`);

      response.redirect('/v1/articles/add');
        })
    .catch((err)=>{
        console.log(err);

    })
  
  }
  const find_article = (request, response)=>{
    let name = request.query.name;
    let color = request.query.color;
    let nameRegex = (name && name.length > 0)? new RegExp(name, 'i') : null;
    let colorRegex = (color && color.length > 0)? new RegExp(color, 'i') : null;
    let search = {};
    if( nameRegex != null && codeRegex != null){
      search =  { 'name':  nameRegex , 'code': codeRegex }
                      ;
    }else if(colorRegex != null){
      search = { 'code': colorRegex  };
    } else if(nameRegex != null){
      search = { 'name': nameRegex };
    } else {     
      search = {};
    }
   
  };
  

  const delete_article = (request, response)=>{
    let id = request.params.id;
    Article.findByIdAndDelete(id)
     .then((result) => {
     console.log(`Article deleted from database: id -> ${result._id}`);
     response.json({ redirect: '/v1/articles/search'});
    })
     .catch((err) => {  console.log(err) });
    };


    const update_article =  (request, response) => {
      const filter = { _id: request.params.id };

      const update = { 
        name: request.params.name,
        code: request.params.color,
         price: request.params.price
                      }; 
     

        Article.findOneAndUpdate(filter, update)
      .then((result) => {
        console.log(`Article updated from database: id -> ${result._id}`);
        response.json({ redirect: '/v1/articles/search'});
      })
      .catch((err) => { console.log(err) });
      
  };
  

  module.exports={open_article_form,add_article,find_article,delete_article,update_article}