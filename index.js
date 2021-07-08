// creating server
const { time } = require("console");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // To access body of JSON

//Home Page
app.get('/',(req,res)=>{
  res.status(200).json({message:"Home Page"})
})

// Creates File with the given name
const fs = require("fs");
var current_datetime = new Date();
let date = ("0" + current_datetime.getDate()).slice(-2);
let month = ("0" + (current_datetime.getMonth() + 1)).slice(-2);
let year = current_datetime.getFullYear();
let hours = current_datetime.getHours();
let minutes = current_datetime.getMinutes();
let seconds = current_datetime.getSeconds();
let timeStamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
console.log(timeStamp)
app.get("/createfiles",(req,res)=>{
    fs.writeFile(
        "./Files/current-datetime.txt",
        timeStamp,
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
app.get("/allfiles",(req,res)=>{
    const folderFiles = []
    fs.readdir(folder, function (error, data) {
        if(error){
            res.json({message:"No Files found"})
        }else{
            data.forEach((file)=>{
              folderFiles.push(file)
            })
            res.json({AllFiles:folderFiles})
        }
      });
})

// Read content of created Text file
const fileName = './Files/current-datetime.txt';
app.get('/readfile',(req,res)=>{
  fs.readFile(fileName,'utf8',(error,data)=>{
    if(error){
      res.json({message:"Error occured in Reading file"})
    }else{
      res.json({message:data})
    }
  })
})

app.listen(port, () => {
  console.log("Server listening to Port " + port);
});
