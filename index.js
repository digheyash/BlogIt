import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000 ;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res )=> {
    res.render("index.ejs", { posts: posts });
})


let posts = [
    {
        id: 1,
        title: "My First Blog",
        content: "Welcome to my first blog post!",
        author: "Yash"
    },
    {
        id: 2,
        title: "Learning Node.js",
        content: "Today I started learning Express.js and EJS.",
        author: "Yash"
    }
];


app.get("/create", (req, res) => {
    res.render("create.ejs");
});


app.post("/create", (req, res) => {

    const newPost = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    posts.push(newPost);

    res.redirect("/");
});


app.post("/delete/:id", (req, res) => {

    const id = Number(req.params.id);

    posts = posts.filter(post => post.id !== id);

    res.redirect("/");
});


app.get("/edit/:id", (req, res) => {

    const id = Number(req.params.id);

    const post = posts.find(post => post.id === id);

    res.render("edit.ejs", { post: post });
});


app.post("/edit/:id", (req, res) => {

    const id = Number(req.params.id);

    const post = posts.find(post => post.id === id);

    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;

    res.redirect("/");
});


app.listen(port,() => {
    console.log(`Server is running on port http://localhost:${port}`);
})