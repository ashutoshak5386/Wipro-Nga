const express = require('express');
const app = express();
const bookRouter = require('./routes/books');

// middleware logger
app.use((req,res,next)=>{
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// basic routes
app.get('/', (req,res)=> res.send("Welcome to Express Server"));
app.get('/status', (req,res)=> res.json({server:"running", uptime:"OK"}));
app.get('/products', (req,res)=>{
  const {name}=req.query;
  if(!name) return res.send("Please provide a product name");
  res.json({query:name});
});

// mount router
app.use('/books', bookRouter);

// 404 handler
app.use((req,res)=> res.status(404).send("Route not found"));

// error handler
app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).json({error:"Internal Server Error"});
});

app.listen(4000, ()=> console.log("Server running on port 4000"));
