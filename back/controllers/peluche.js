require('mongoose');
const Pel = require('../models/peluche');



const addPeluche = async (nombre,animal,color,accesorio,propietario) => {


        const pel = new Pel(
            {              
                animal:animal,
                color:color,
                accesorio:accesorio,
                nombre:nombre,
                propietario:propietario
            }
        );

        let peluche = await pel.save(); 
        console.log("peluche nuevo");
        console.log(peluche);
        return { peluche }; 

 
}   


const getAllPeluches = async (limit,offset) => {

    const peluches = await Pel.find({}).limit(limit).skip(offset);

    return peluches;
}


const getAllPeluchesuser = async (limit,offset,iduser) => {

    const peluches = await Pel.find({propietario: iduser}).limit(limit).skip(offset);

    return peluches;
}


const getpeluche = async(id) => {

    const peluche = await Pel.findById(id);

    return peluche;
}


const editPeluche = async(peluche) => {

    const result = await Pel.findByIdAndUpdate(peluche._id,peluche,{new:true});

    return result;
}


const deletePeluche = async(id) => {

    const result = await Pel.findByIdAndDelete(id);

    return result;
}


module.exports = { addPeluche, getAllPeluches, getpeluche, editPeluche, deletePeluche,getAllPeluchesuser} 