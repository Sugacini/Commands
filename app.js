const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql2");
const socketio = require("socket.io");
const http = require("http");

app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "suga@123",
    database: "jsDataBase",
});

connection.connect((err) =>{
    if(err){
        console.log("Error",err);
    }
    else{
        console.log("connected Mysql");
    }
})

app.set("view engine", "ejs");

const pubDir = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.static(pubDir));

app.get("/login", (req,res) => {
    res.render("login");
})

app.get("/", (req, res) => {
    res.render("signUp");
})

app.get("/chat", (req, res) => {
    res.render("chat");
})


let userName;
let email;
let password;
app.post("/signUp", (req,res)=> {
    console.log(req.query);
    userName = req.body.name;
    email = req.body.email;
    password = req.body.password;
    console.log(userName, email);
    connection.query("INSERT INTO Login(Name,email, password) values(?,?, ?)", [userName, email,password], (err,result) => {
        if(err){
            console.log("throw error", err);
        }
        else{
            res.status = 200;
            data = result;
        }
    })

})

app.post("/login", (req,res) => {
    connection.query("select name, password from Login", (err,data) => {
        // socket.emit("loginData", data);
        console.log(data);
    })
    userName = req.body.name;
    password = req.body.password;
})

app.post("/chat", (req, res) => {
    console.log(req.body);
    console.log(userName, email, password);
    let msg = req.body.msg;
    connection.query("INSERT INTO commands(name,password,commands) values(?,?,?)", [userName,password,msg], (err,result) => {
        if(err){
            console.log("throw error", err);
        }
        else{
            res.status = 200;
            data = result;
            console.log("suga");
        }
    })
})

io.on("connection", (socket) => {
    let datas;
    connection.query("select name,commands from commands", (err,data) => {
        if(err){
            console.log(err);
        }
        else{
            socket.emit("dbCommands", data);
            console.log(data, data.length);
        }
    })
   
})
.length
app.get("/chat", (req,res)=>{
    res.render("chat");
})

app.get("*", (req,res) => {
    res.send("<h1>404 Not Found</h1>");
})

server.listen(3200, () => {
    console.log("server connected the port is 3200");
})
