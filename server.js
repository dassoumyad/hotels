require("dotenv").config()
const express = require('express');
const app = express();
const connectDb = require('./utils/db'); // Fix the require statement
// const bodyParser=require("body-parser")
// app.use(bodyParser.json())


app.use(express.json())
// middleware function 
const  logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
 next(); //move to next phase it mendentory for going other phase
}
app.use(logRequest) //it fetch time and data what data user request it u give logrequest to anyone then date and time for that will show oher will not

app.get('/', function (req, res) {
  res.send('Hello World');
});

// import router
const personRoutes=require("./routes/personRoutes");
app.use("/person",personRoutes);





const PORT = 3000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});
