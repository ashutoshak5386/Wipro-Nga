const express = require('express');
const router = express.Router();

let books=[
  {id:1,title:"1984",author:"Orwell"},
  {id:2,title:"The Alchemist",author:"Coelho"}
];

router.get('/',(req,res)=> res.json(books));

router.get('/:id',(req,res)=>{
  const b=books.find(x=>x.id==req.params.id);
  if(!b) return res.status(404).json({error:"Book not found"});
  res.json(b);
});

router.post('/',(req,res)=>{
  const {title,author}=req.body;
  if(!title||!author) return res.status(400).json({error:"title and author required"});
  const newBook={id:books.length+1,title,author};
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id',(req,res)=>{
  const b=books.find(x=>x.id==req.params.id);
  if(!b) return res.status(404).json({error:"Book not found"});
  if(req.body.title) b.title=req.body.title;
  if(req.body.author) b.author=req.body.author;
  res.json(b);
});

router.delete('/:id',(req,res)=>{
  const idx=books.findIndex(x=>x.id==req.params.id);
  if(idx===-1) return res.status(404).json({error:"Book not found"});
  books.splice(idx,1);
  res.json({message:"Deleted"});
});

module.exports=router;
