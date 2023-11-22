import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
app.set('view engine','ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}));

const db = new pg.Client({
    user : "postgres",
    database : "world",
    host : "localhost",
    password : "A9wksB@1",
    port : 5432,

})

db.connect();

app.get("/",(req,res) => { 
    res.render("home");
})

app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",async (req,res) => {
    const name = req.body.username;
    const password = req.body.password;
    try{
        const result = await db.query("INSERT INTO users(username,password) VALUES ($1,$2)",[name,password]);
        res.render("secrets")
    }
    catch(err){
        console.log(err)
    }
    
})
app.post("/login", async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        const result = await db.query("SELECT * FROM users WHERE username = $1",[username]);
        if(result.rows.length !== 0){
            if(result.rows[0].password === password){
                res.render("secrets")
            }  
        }
    }catch(err){
        console.log(err);
    }
})

app.listen(port,()=>{
    console.log(`Server is listening on port : ${port}`)
})