const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path'); 
const port = 880;

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const blogPosts = [

]; //

app.get('/', (req, res) => {
  res.render('main', { posts: blogPosts });  
}); 

app.get('/blog/:id', (req, res) => {
  const postId = req.params.id;
  const post = blogPosts.find(post => post.id === postId);
  res.render('post', { post: post });
});

app.get('/add', (req, res) => {
  res.render('add');
});

const examplePosts = [
  { id: '1', title: 'Post 1', content: 'Post 1 text' },
  { id: '2', title: 'Post 2', content: 'Post 2 text' },
  { id: '3', title: 'Post 3', content: 'Post 3 text' }
];

blogPosts.push(...examplePosts);

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const postId = generatePostId();
  const newPost = { id: postId, title: title, content: content };
  blogPosts.push(newPost);
  res.redirect('/');
});

function generatePostId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

const PORT = 880;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});