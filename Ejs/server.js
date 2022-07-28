const express = require('express');
const Contenedor = require('./contenedor')

const app = express();
const contenedor = new Contenedor('productos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs')

const server = app.listen(8080,()=>{
    console.log("App funcionando");
});

server.on('error',()=>console.log("Error en la conexión"))

app.get('/',(req,res)=>{
    res.render("pages/form")
})

app.get('/productos',(req,res)=>{
    res.render("pages/main",{contenedor: contenedor.getAll(), length: contenedor.length()})
})


app.post('/productos',(req,res)=>{
    const newProducto = req.body;
    contenedor.save(newProducto);
    res.redirect('/')
})
