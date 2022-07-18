/* dotenv*/ 



/* EXPRESS */

const express = require("express");
const app = express();
require('dotenv').config();


app.use(express.static(__dirname + '/'));

app.set("view engine","ejs");
var acces_token="";

app.get("/", function(req,res){
    res.render("pages/index",{client_id: clientID});
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log ("App listening on port " + port));

/* Axios */

const axios = require("axios");

const clientID =process.env.clientID;
const clientSecret = process.env.clientSecret;

app.get('/github/callback', (req, res) => {

    const requestToken = req.query.code
    
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
           accept: 'application/json'
      }
    }).then((response) => {
      access_token = response.data.access_token
      res.redirect('/success');
    })
  })
  
  app.get('/success', function(req, res) {
  
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: 'token ' + access_token
      }
    }).then((response) => {
      res.render('pages/success',{ userData: response.data });
    })
  });
