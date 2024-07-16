const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
let port = 8080;

app.listen(port, () => {
    console.log("App is listening");
});
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts = [
    {
        id:uuidv4(),
        username: "sweekar",
        content: "my name is sweekar"
    },
    {
        id:uuidv4(),
        username: "yash",
        content: "my name is yash"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    console.log(req.body);
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("detail",{post});
    
})
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    if (post) {
        post.content = newcontent;
        console.log("Updated Post:", post);
        res.redirect("/posts");
    } else {
        res.status(404).send("Post not found");
    }
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> p.id===id);
    res.render("edit" ,{post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>p.id!==id);
    res.redirect("/posts");
})


