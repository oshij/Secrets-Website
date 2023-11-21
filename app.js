import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.set('view engine','ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}));


app.get("/",(req,res) => { 
    res.render("home")
})




app.listen(port,()=>{
    console.log(`Server is listening on port : ${port}`)
})