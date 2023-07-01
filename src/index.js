const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");/// hbs a similar syntax of html 
const collection = require("./mongodb");

const templatePath = path.join(__dirname, "../templates"); //template file path

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

//get  login page
app.get("/", (request, response) => {
  response.render("login");
});

//get signup page
app.get("/signup", (request, response) => {
  response.render("signup");
});

app.post("/signup", async (request, response) => {
  const data = {
    name: request.body.name,
    password: request.body.password,
  };

  collection.insertMany([data]); //inserting the data into mongodb

  await response.send(`Signup is Successfully Done!$ {request.body.name}`)
});



//login form 
app.post("/login", async (request, response) => {
        try {
            const check = await collection.findOne({name:request.body.name})
            if(check.password === request.body.password){
                response.send(`User Name: ${request.body.name}, User password: ${request.body.password}`)
            }
            else{
                response.send("Wrong password")
            }
        } catch (error) {
            response.send("wrong details")
        }
  });



let port=3000;
app.listen(port, () => {
  console.log(`server is running on port$ {port}`);
});