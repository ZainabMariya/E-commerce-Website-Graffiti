const express=require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Article = require('./model/article'); 
const articleRouters=require('./router/articleRouters')
// Load configuration file .env
require('dotenv').config();
// Create an express app
const app=express();
// Use the 'public' folder as static
app.use(express.static('public'));

// Configure the app to use EJS as view template engine
app.set('view engine','ejs')

// Add body parameters parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve homepage
app.get('/', (request, response) => { 
    response.render('SW', { title: 'Home'});
  });
  
  // Add Articles Routes handler
  app.use('/v1/articles', articleRouters)


  // Serve 404 page if no corresponding route
  app.use((request, response) => {
    response.status(404).render('404', { title: '404' });
  });

  console.log('MONGO_URI:', process.env.MONGO_URI);
  console.log('PORT:', process.env.PORT);
  
// Connect to database then start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database...");
    app.listen(process.env.PORT, 'localhost', () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
  