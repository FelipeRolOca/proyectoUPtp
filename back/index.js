// PORT = 8080;

const express = require ("express");
const app = express();
app.use(express.json());
const http = require ("http").createServer(app);
require ('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");

const UsrController = require('./controllers/user');
const AuthController = require('./controllers/user');
const Middleware = require('./middleware/auth-middleware');
const MailController = require('./controllers/mail');
const PelController = require('./controllers/peluche')

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const { MongoClient , ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URL

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err))

  app.use(express.json());


  
  app.get("/", (req, res) => {
    //res.send("Hola estoy funcionando.");
    res.status(200).json("Hola estoy funcionando.");
  });
  
  // GET - POST - DELETE - PUT - PATCH 
  
  app.post("/",(req,res) => {
      res.send("Llamada post");
  });
  
  // Get de todos los usuarios
  app.get("/users",Middleware.verify,async (req,res) =>{
  
    let limit = req.query.limit;
    let offset = req.query.offset;
  
    try{
        const results = await UsrController.getAllUsers(limit,offset);
        res.status(200).json(results);
  
    }catch(error){
        res.status(500).send("Error. Intente mÃ¡s tarde.")
    }
  
  });
  
  // Get Info de un usuario
  
  app.get("/users/:id",async (req,res) =>{
  
      let userId =  req.params.id;
  
      try{
  
        user = await UsrController.getUser(userId);
  
        res.status(200).json(user);
  
      }catch(error){
        res.status(500).send("Error");
      }
  
  });

  app.get("/users/:id",async (req,res) =>{
  
    let userId =  req.params.id;

    try{

      user = await UsrController.getUser(userId);

      res.status(200).json(user);

    }catch(error){
      res.status(500).send("Error");
    }

});
  
//obtener peluches
app.get("/users/:id/peluches",async (req,res) =>{
  
  let userId =  req.params.id;

  try{

    peluches = await UsrController.getAllUsersPeluches(userId);

    res.status(200).json(peluches);

  }catch(error){
    res.status(500).send("Error");
  }

});













// Creo un nuevo usuario

app.post("/users",async (req,res) =>{
  
  let name = req.body.name;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let isActive = req.body.isActive;
  let password = req.body.password;
  try{
    const result = await UsrController.addUser(name,lastname,email,isActive,password);
    if(result){
      res.status(201).send("Usuario creado correctamente"); // 201
    }else{
      res.status(409).send("El usuario ya existe"); // 409
    }  
  }catch(error){
    console.log(error);
    res.status(500).send("Error al crear el usuario."); //500
  }  
  
});

// Modifico un usuario
app.put("/users/:id",async (req,res) =>{

  const user = { _id: req.params.id, ...req.body };
  //             {_id: req.params.id, name: req.body.name, lastname, email }
  try{
    
    const result = await UsrController.editUser(user);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El usuario no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error");
  } 

});

// Elimino un usuario
app.delete("/users/:id", async(req,res) =>{

  try{

    const result = await UsrController.deleteUser(req.params.id);
    if(result){
      res.status(200).send("Usuario borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el usuario.")
    }  

  }catch(error){
    res.status(500).send("Error")
  }
});


app.post("/auth/login", async (req,res) => {

  const email = req.body.email;
  const password = req.body.password;
  try{
    const result = await AuthController.login(email,password);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(401).send("No puede estar aqui")
    }
  }catch(error){
      res.status(500).send("Error");
  }  
})

















/* Manda un mail */
//MailController.sendMail();






// peluche 
// Creo un nuevo peluche
app.post("/peluches/:idusuario/create",async (req,res) =>{
  
  let nombre = req.body.nombre;
  let animal = req.body.animal;
  let color = req.body.color;
  let accesorio = req.body.accesorio;
  let propietario = req.params.idusuario;
  const user = { _id: req.params.id, ...req.body };
  

  
  try{
    const result = await PelController.addPeluche(nombre,animal,color,accesorio,propietario);
    
    if(result){
    
      res.status(201).send("peluche  creado correctamente"); // 201
    }else{
      res.status(409).send("El peluche ya existe"); // 409
    }  
  }catch(error){
    console.log(error);
    res.status(500).send("Error al crear el peluche ."); //500
  }  
  
});


//editar peluche
app.put("/peluches/:id",async (req,res) =>{

  const peluche = { _id: req.params.id, nombre: req.body.nombre, animal: req.body.animal,color: req.body.color, accesorio: req.body.accesorio  };
  
  try{
    
    const result = await PelController.editPeluche(peluche);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El peluche no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error");
  } 
  
  // borrar 

  app.delete("/peluches/:id", async(req,res) =>{

    try{
  
      const result = await PelController.deletePeluche(req.params.id);
      if(result){
        res.status(200).send("peluche borrado.")
      }else{
        res.status(404).send("No se ha podido eliminar el peluche.")
      }  
  
    }catch(error){
      res.status(500).send("Error")
    }
  });

});

app.get("/peluches",async (req,res) =>{
  
  let limit = 5 ;
  let offset = req.query.offset;

  try{
      const results = await PelController.getAllPeluches(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente mas tarde.")
  }

});

app.listen(PORT, () => {
  console.log(`Servidor levantado ${PORT}`)
})
