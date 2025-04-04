const express = require("express");
const app = express();
const session= require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionoptions= {
    secret:"mysupersecretstring" , 
    resave:false,
    saveUninitialized:true,
    };

    app.use(session(sessionoptions));
    app.use(flash());

    app.use((req,res,next) =>{
        res.locals.success=req.flash("sucesss");
        res.locals.error=req.flash("error");
        next();
    })
    app.get("/register" , (req,res) =>{
         let { name="anonymous" } =req.query;
         req.session.name=name;
         if(name==="anonymous"){
            req.flash("error" ,"user not registered ");
         }else{
            req.flash("success" ,"user registered sucessfully!");
         }
         res.redirect("/hello");
    })

    app.get("/hello", (req,res) =>{
       
       res.render("page.ejs" , {name:req.session.name , msg:req.flash("sucess") });
    })





// app.get("/reqcount", (req,res) =>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// })

// app.get("/test", (req,res) =>{
//     res.send("test sucessful!");
// });

app.listen(3000, () =>{
    console.log("server is listening to 3000");
});