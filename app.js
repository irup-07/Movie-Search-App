const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");


const app = express();


app.set('view engine', 'ejs');



app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req , res){

  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req , res)
{

  var movie = req.body.movieName;


  var option = {

    url:" http://www.omdbapi.com",
    method:"GET",
    qs:{
      t:movie,
      apikey:"API_KEY"

    }
  };


  request(option , function(error , response , body)
  {
   var data = JSON.parse(body);
 var releaseDate = data.Released
 if(data.Response==="True"){
res.render("moviedetails.ejs" , {release:releaseDate ,runtime:data.Runtime, title:data.Title , poster:data.Poster , imdb:data.imdbRating ,
    genre:data.Genre , plot:data.Plot , actors:data.Actors , languages:data.Language,
awards:data.Awards , movietype:data.Type , imdbID:data.imdbID , director:data.Director , country:data.Country , writer:data.Writer} );
}
else {
  res.render("failure.ejs", {name:movie});
}
console.log(response.statusCode);
// 6e1f1bd9
});

});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port , function(){

console.log("Server started in port : 3000");
});
