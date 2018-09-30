const express=require('express');
var app=express(); 
const hbs=require('hbs');
const fs=require('fs');
var port=process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrYear',()=>{
     return new Date().getFullYear()
});


app.set('view engine','hbs');

//setting loggger
app.use((req,res,next)=>{
    var time= new Date().toString();
    var log=`${time} Method:- ${req.method} URL:- ${req.url}`;
    fs.appendFileSync('server.log',log+ '\n');
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintain.hbs')
// });
app.use(express.static(__dirname+'/public'));
app.get('/', (req,res)=>{
    res.render('home.hbs',{
        title:'Home Page',
        body:'This is the home page'
    }); 
});
//dyanamic rendering of webpages 
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About Page',
        body:'Hello this is about page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'This is a bad request'
    });
})
app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
});