const express = require('express');
const Contenedor = require('./contenedor')

const app = express();
const contenedor = new Contenedor('productos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views')
app.set('view engine', 'pug')

const server = app.listen(8080,()=>{
    console.log("App funcionando");
});

server.on('error',()=>console.log("Error en la conexión"))

app.get('/',(req,res)=>{
    res.render("form.pug")
})

app.get('/productos',(req,res)=>{
    res.render("main.pug",{contenedor: contenedor.getAll(), length: contenedor.length()})
})


app.post('/productos',(req,res)=>{
    const newProducto = req.body;
    contenedor.save(newProducto);
    res.redirect('/')
})
