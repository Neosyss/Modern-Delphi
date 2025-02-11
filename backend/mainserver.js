const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let blogs = [
    { id: 1, title: 'First Blog', hashtags: '#react', content: 'This is the first blog.', image: null, date: '2023-10-01' },
    { id: 2, title: 'Second Blog', hashtags: '#node', content: 'This is the second blog.', image: null, date: '2023-10-02' },
];

// Get all blogs
app.get('/api/blogs', (req, res) => {
    res.json(blogs);
});

// Add a new blog
app.post('/api/blogs', (req, res) => {
    const newBlog = { id: blogs.length + 1, ...req.body };
    blogs.push(newBlog);
    res.json(newBlog);
});

// Update a blog
app.put('/api/blogs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBlog = req.body;
    blogs = blogs.map(blog => blog.id === id ? { ...blog, ...updatedBlog } : blog);
    res.json(blogs.find(blog => blog.id === id));
});

// Delete a blog
app.delete('/api/blogs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    blogs = blogs.filter(blog => blog.id !== id);
    res.json({ message: 'Blog deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});