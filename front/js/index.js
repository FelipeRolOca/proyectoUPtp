

document.addEventListener("DOMContentLoaded",function(){
    function generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
//login
var enviar = document.getElementById('enviar');
let password = null;
let email = null;
let token = null;
let id = null;
let idguardado;
let tokenguardado;
tokenguardado = localStorage.getItem("token");
idguardado = localStorage.getItem("id");


if (enviar){
 document.getElementById('enviar').addEventListener('click', function() {
    event.preventDefault();
    password =document.getElementById("password").value;
    email = document.getElementById("email").value;
    const datos = {
        password: password,
        email: email
    };

    fetch('http://localhost:8080/autentificacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        token = data;
        localStorage.setItem("token",token);
        console.log(token);
        tokenguardado = localStorage.getItem("token");
        
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
    fetch('http://localhost:8080/usersid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
       
       id = data.id;
       localStorage.setItem("id", id);
       console.log(tokenguardado);

    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });


});

}

idguardado = localStorage.getItem("id");

    
   
//crear peluche

let animal = {animal:null};
let color = {color:null};
let accesorio = {accesorio:null};
let animalenviar= null;
let accesorioenviar= null;
let colorenviar= null;
var button = document.getElementById('gatoButton');

if (button) {
document.getElementById('gatoButton').addEventListener('click', function() {
    animal = { animal: 'gato'};
    
});
document.getElementById('perroButton').addEventListener('click', function() {
    animal = { animal: 'perro'};  
});
document.getElementById('conejoButton').addEventListener('click', function() {
    animal = { animal: 'conejo'};
});
document.getElementById('mapacheButton').addEventListener('click', function() {
    animal = { animal: 'mapache'};
});
document.getElementById('osoButton').addEventListener('click', function() {
    animal = { animal: 'oso'}; 
});
document.getElementById('amarilloButton').addEventListener('click', function() {
    color = { color: 'amarillo'};
});
document.getElementById('verdeButton').addEventListener('click', function() {
    color = { color: 'verde'};
});
document.getElementById('rosaButton').addEventListener('click', function() {
    color = { color: 'rosa'};
});
document.getElementById('futbolButton').addEventListener('click', function() {
    accesorio = { accesorio: 'futbol'};
});
document.getElementById('guitarraButton').addEventListener('click', function() {
    accesorio = { accesorio: 'guitarra'};
});
document.getElementById('nootebook').addEventListener('click', function() {
    accesorio = { accesorio: 'nootebook'};
});

    
    
document.getElementById('guardar').addEventListener('click', function() {
    animalenviar= animal.animal;
    accesorioenviar= accesorio.accesorio;
    colorenviar= color.color;
    
    let div = document.getElementById("mandarinfo")
    let buttonen = document.getElementById("enviarinfo")
    div.style.visibility = 'visible';
    buttonen.style.visibility = 'visible';
    div.innerHTML = ''      
    let ul = document.createElement("ul");
    

    

    panimal = document.createElement("p")
    animal = document.createTextNode(animal.animal)
    panimal.appendChild(animal)
    let lianimal = document.createElement("li");


    pcolor = document.createElement("p")
    color = document.createTextNode(color.color)
    pcolor.appendChild(color)
    let licolor = document.createElement("li");


    paccesorio = document.createElement("p")
    accesorio = document.createTextNode(accesorio.accesorio)
    paccesorio.appendChild(accesorio)
    let liaccersorio = document.createElement("li");

 


    lianimal.appendChild(panimal);
    licolor.appendChild(pcolor);
    liaccersorio.appendChild(paccesorio);
    ul.appendChild(lianimal);
    ul.appendChild(licolor);
    ul.appendChild(liaccersorio);
    div.appendChild(ul);

});

document.getElementById('enviarinfo').addEventListener('click', function() {

    const taskId = generateRandomId(10);
    const datos = {
        nombre: taskId,
        animal: animalenviar,
        color: colorenviar,
        accesorio: accesorioenviar
    };

    let id = idguardado;
    let token = tokenguardado;
    

    const url = new URL(`http://localhost:8080/peluches/${id}/create`);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

    })
    location.reload();
});

}

//index

const contenedor = document.getElementById("contenedor");
if(contenedor){
    
fetch('http://localhost:8080/peluchesmasvendidos')
    .then(response => response.json())  
    .then(json => mostrarDatos(json))    
    .catch(err => console.log('Solicitud fallida', err)); 

    function mostrarDatos(json){
        console.log(json);
        const extractedAttributes = json.map(item => ({
            animal: item._id.animal,   
            total: item.total
        }));
        extractedAttributes.forEach(attr => {
            
            if (attr.animal === 'perro') {
                const img = document.createElement('img');
                img.src = './imagenes/perro.webp';
                img.alt = 'perro';
                const li = document.createElement('li');
                const p = document.createElement('p');
                p.textContent = attr.total;
                li.appendChild(img);
                li.appendChild(p);
                contenedor.appendChild(li)
            } else if (attr.animal === 'oso') {
                const img = document.createElement('img');
                img.src = './imagenes/oso.jpeg';
                img.alt = 'oso';
                const li = document.createElement('li')
                const p = document.createElement('p');
                p.textContent = attr.total;
                li.appendChild(img);
                li.appendChild(p);
                contenedor.appendChild(li)
            } else if (attr.animal === 'mapache') {
                const img = document.createElement('img');
                img.src = './imagenes/mapache.webp';
                img.alt = 'mapache';
                const li = document.createElement('li')
                const p = document.createElement('p');
                p.textContent = attr.total;
                li.appendChild(img);
                li.appendChild(p);
                contenedor.appendChild(li)
            } else if (attr.animal === 'conejo') {
                const img = document.createElement('img');
                img.src = './imagenes/conejo.jpg';
                img.alt = 'conejo';
                const li = document.createElement('li')
                const p = document.createElement('p');
                p.textContent = attr.total;
                li.appendChild(img);
                li.appendChild(p);
                contenedor.appendChild(li)
            }
            else if (attr.animal === 'gato') {
                const img = document.createElement('img');
                img.src = './imagenes/gato.jpeg';
                img.alt = 'conejo';
                const li = document.createElement('li')
                const p = document.createElement('p');
                p.textContent = attr.total;
                li.appendChild(img);
                li.appendChild(p);
                contenedor.appendChild(li)
            }
        });
        
    }   
} 

//profile
const perfil = document.getElementById("perfil");
if(perfil){
    let id = idguardado;
    let token = tokenguardado;
    const url = new URL(`http://localhost:8080/users/${id}/peluches`);
    fetch(url, {
        method: 'GET', 
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' 
        }
    })
    .then(response => response.json())  
    .then(json => mostrarDatos(json))  
    .catch(error => {
        console.error('Error recibido:', error.message);
        if(error){
            const p = document.createElement('p');
            p.textContent = "no ha inciado sesion correctamente";
            perfil.appendChild(p)
          }
      });
      




        
    function mostrarDatos(json){
        console.log(json);
        const extractedAttributes = json.map(item => ({
            animal: item.animal,   
            id: item.id
        }));
        
        extractedAttributes.forEach(attr => {
            
            if (attr.animal === 'perro') {
                const img = document.createElement('img');
                img.src = './imagenes/perro.webp';
                img.alt = 'perro';
                const li = document.createElement('li');
                li.appendChild(img);
                perfil.appendChild(li);
                const button = document.createElement('button');
                button.id = attr.id;
                button.textContent = 'eliminar';
                li.appendChild(button)
                if(button){
                    document.getElementById(button.id).addEventListener('click', function() {
                        const url = new URL(`http://localhost:8080/peluches/${button.id}`);

                            fetch(url, {
                                        method: 'DELETE', 
                                        headers: {
                                            'Content-Type': 'application/json' 
                                        }
                                        })
                                        .catch(error => {
                                            console.error('Error recibido:', error.message);
                                          });
                                        location.reload();



                })}}
            
            else if (attr.animal === 'oso') {
                const img = document.createElement('img');
                img.src = './imagenes/oso.jpeg';
                img.alt = 'oso';
                const li = document.createElement('li')
                li.appendChild(img);
                perfil.appendChild(li);
                const button = document.createElement('button');
                button.id = attr.id;
                button.textContent = 'eliminar';
                li.appendChild(button)
                if(button){
                    document.getElementById(button.id).addEventListener('click', function() {
                        const url = new URL(`http://localhost:8080/peluches/${button.id}`);

                            fetch(url, {
                                        method: 'DELETE', 
                                        headers: {
                                            'Content-Type': 'application/json' 
                                        }
                                        })
                                        .catch(err => console.log('Solicitud fallida', err)); 
                                        location.reload();



                })}
            } else if (attr.animal === 'mapache') {
                const img = document.createElement('img');
                img.src = './imagenes/mapache.webp';
                img.alt = 'mapache';
                const li = document.createElement('li')
                li.appendChild(img);
                perfil.appendChild(li);
                const button = document.createElement('button');
                button.id = attr.id;
                button.textContent = 'eliminar';
                li.appendChild(button)
                if(button){
                    document.getElementById(button.id).addEventListener('click', function() {
                        const url = new URL(`http://localhost:8080/peluches/${button.id}`);

                            fetch(url, {
                                        method: 'DELETE', 
                                        headers: {
                                            'Content-Type': 'application/json' 
                                        }
                                        })
                                        .catch(err => console.log('Solicitud fallida', err)); 
                                        location.reload();



                })}
            } else if (attr.animal === 'conejo') {
                const img = document.createElement('img');
                img.src = './imagenes/conejo.jpg';
                img.alt = 'conejo';
                const li = document.createElement('li')
                li.appendChild(img);
                perfil.appendChild(li);
                const button = document.createElement('button');
                button.id = attr.id;
                button.textContent = 'eliminar';
                li.appendChild(button)
                if(button){
                    document.getElementById(button.id).addEventListener('click', function() {
                        const url = new URL(`http://localhost:8080/peluches/${button.id}`);

                            fetch(url, {
                                        method: 'DELETE', 
                                        headers: {
                                            'Content-Type': 'application/json' 
                                        }
                                        })
                                        .catch(err => console.log('Solicitud fallida', err)); 
                                        location.reload();



                })}
            }
            else if (attr.animal === 'gato') {
                const img = document.createElement('img');
                img.src = './imagenes/gato.jpeg';
                img.alt = 'conejo';
                const li = document.createElement('li')
                li.appendChild(img);
                perfil.appendChild(li)
                const button = document.createElement('button');
                button.id = attr.id;
                button.textContent = 'eliminar';
                li.appendChild(button)
                if(button){
                    document.getElementById(button.id).addEventListener('click', function() {
                        const url = new URL(`http://localhost:8080/peluches/${button.id}`);

                            fetch(url, {
                                        method: 'DELETE', 
                                        headers: {
                                            'Content-Type': 'application/json' 
                                        }
                                        })
                                        .catch(err => console.log('Solicitud fallida', err)); 
                                        location.reload();



                })}
            }
        });
        
    }   
} 

});
