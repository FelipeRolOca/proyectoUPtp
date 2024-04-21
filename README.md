Para crear un usuario se debe acceder al puerto
post -- localhost:8080/users
para crear peluches
post -- localhost:8080/peluches/:iduser/create
borrar usuarios
delete -- localhost:8080/users/iduser
borrar peluche
delete -- localhost:8080/peluches/idpeluche
para mostrr los usuarios primero se debe crear un token como esta especificado abajo y este token se ingresa como bear token
get -- localhost:8080/users
para mostrar peluches
get -- localhost:8080/peluches
para mosterar todos los peluches de un usuario 
get -- localhost:8080/users/iduser/peluches
para generar un token se debe ingresar el password y el email
post -- localhost:8080/autentificacion
{
    "password" : "15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225",
    "email" : "emailfalso@hotamil"
}
mostrar los peluches mas vendidos
get -- localhost:8080/peluchesmasvendidos
modificar peluches 
put -- /peluches/:idpeluche
modificar usuario
put -- /users/:id
Tenes que realizar el npm install con las sigueintes cosas :
"@types/node"
    "dotenv"
    "express"
    "jsonwebtoken"
    "moment"
    "mongoose"
    "nodemailer"
