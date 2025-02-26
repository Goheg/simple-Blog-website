import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let blogs = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/submit",  (req, res) => {
    const{title, content} = req.body;
    const newBlog = {id: Date.now(), title, content}
    blogs.push(newBlog)

    console.log(blogs)

    res.render("index.ejs", {blog: blogs})
});

app.get("/read/:id", (req, res) => {
    const blg = blogs.find(b => b.id == req.params.id)
    console.log(blg)
    res.render("read.ejs", {
        blogTitle: blg.title,
        blogContent: blg.content
    })
});

app.get("/edit/:id", (req, res) => {
    const ePost = blogs.find(b => b.id == req.params.id)
    res.render("edit.ejs", {post: ePost})
});

app.post("/edit/:id", (req, res) => {
    const {title, content} = req.body;
    const postIndex = blogs.findIndex(b => b.id == req.params.id)

    if(postIndex !== -1) {
        blogs[postIndex] = {id: blogs[postIndex].id, title, content}
    }

    // res.redirect('/')
    res.render("index.ejs", {blog: blogs})
});

app.listen(port, () => {
    console.log(`Server is running in ${port}`)
})