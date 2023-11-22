import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import pg from "pg";
import 'dotenv/config';
import md5 from "md5";

const app = express();
app.set('view engine','ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}));

const db = new pg.Client({
    user : process.env.DB_USER,
    database : process.env.DB_DATABASE,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,

})


db.connect();
console.log("Database Connected !!!!");


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
    const password = md5(req.body.password);
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
    const password = md5(req.body.password);
    try{
        const result = await db.query("SELECT * FROM users WHERE username = $1",[username]);
        if(result.rows.length !== 0){
            if( result.rows[0].password === password){
                res.render("secrets")
            }  
        }
    }catch(err){
        console.log(err);
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port : ${process.env.PORT}`)
})