const express = require('express');
const handlerbars = require('express-handlebars')
const Contenedor = require('./contenedor')

const app = express();
const contenedor = new Contenedor('productos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('hbs',handlerbars.engine({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('views', './views')
app.set('view engine', 'hbs')

const server = app.listen(8080,()=>{
    console.log("App funcionando");
});

server.on('error',()=>console.log("Error en la conexión"))

app.get('/',(req,res)=>{
    res.render("form")
})

app.get('/productos',(req,res)=>{
    res.render("main",{contenedor: contenedor.getAll(), length: contenedor.length()})
})

app.post('/productos',(req,res)=>{
    const newProducto = req.body;
    contenedor.save(newProducto);
    res.redirect('/')
})

app.use("/public",express.static(__dirname+"/css"))
