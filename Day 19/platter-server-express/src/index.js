const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app
.listen(port, () => {
  console.log(`Platter server is running on http://localhost:${port}`);
}

);

app.all('/about',(req,res)=>{
    console.log(req.method);
    res.send(`THis  app has been created using Express `);
});

app.get('/', (req, res) => {
console.log(req.method);
    res.send('Hello Express Here i conquior <br /> the world');
});



app.post('/', (req, res) => {
console.log(req.method);
    res.send('I know i have to the DB, But i don\'t know how');
});


app.on('error', (err) => {
    console.error('Failed to start server:', err);
});