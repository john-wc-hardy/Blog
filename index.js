import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {

    res.render("index.ejs");

});

let postID = 0;
let listOfPosts = [];

app.post("/submit", (req, res) => {
    
    let postTitle = req.body["title"];
    let postBody = req.body["body"];
    let thePost = {"postID": postID, "title": postTitle, "body": postBody};

    listOfPosts.push(thePost);
    
    postID ++;
    
    res.render("index.ejs", {listOfPosts});

});

app.get("/update/:id", (req, res) => {

    let oldPostID = req.params.id;
    let postToUpdate = {};

    listOfPosts.forEach((posts) => {

        if(posts.postID == oldPostID) {
            postToUpdate = posts;
        }

    });
    
    res.render("update.ejs", { postToUpdate });

});

app.post("/update/:id", (req, res) => {

    let oldPostToUpdateID = req.params.id;

    let newPostTitle = req.body["title"];
    let newPostBody = req.body["body"];

    listOfPosts.forEach((posts) => {

        if(posts.postID == oldPostToUpdateID) {
            posts.title = newPostTitle;
            posts.body = newPostBody;
        }

    });
    
    res.render("index.ejs", { listOfPosts });

});

app.get("/delete/:id", (req, res) => {

    let postToDeleteID = req.params.id;

    for (let i = 0; i < listOfPosts.length; i++) {
        if(listOfPosts[i].postID == postToDeleteID) {
            listOfPosts.splice(i, 1);
        }
    }

    res.render("index.ejs", { listOfPosts });

});

app.listen(port, () => {

    console.log(`The App is unning on Port: ${port}`);

});