const express= require('express')
const router=express.Router()
const articleController=require('../controller/articleController')
const { check } = require('express-validator');
  
router.get('/add', articleController.open_article_form)
router.post('/',[ check('name').isLength({ min: 3 }), 
check('color').isLength({ min: 2 }) ],articleController.add_article)
router.get('/search', articleController.find_article)

router.get('/', articleController.find_article);
router.put('/id/:id/name/:name/color/:color/price/:price', articleController.update_article);

router.delete('/:id', articleController.delete_article);
module.exports=router;
