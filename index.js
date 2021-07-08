// creating server
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // To access body of JSON

// Creates File with the given name
const fs = require("fs");
var current_datetime = Date();
app.post("/files",(req,res)=>{
    fs.writeFile(
        "./Files/current date_time.txt",
        current_datetime,
        function (error, data) {
          if (error) {
            res.json({message:"Error occured"});
          } else {
            res.json({message:"Success File created"});
          }
        }
      );
})

// Read files from the particular folder directory
const folder = "./Files";
app.get("/files",(req,res)=>{
    fs.readdir(folder, function (error, data) {
        if(error){
            res.json({message:"No Files found"})
        }else{
            res.json({files:data})
        }
      });
})

app.listen(port, () => {
  console.log("Server listening to Port " + port);
});
