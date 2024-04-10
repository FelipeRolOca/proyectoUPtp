require('mongoose');
const Pel = require('../models/peluche');



const addPeluche = async (nombre,animal,color,accesorio) => {

    // let existPeluche = await Pel.findOne({ nombre: nombre });
    // console.log(existPeluche);
    //if(!existPeluche) {

        const pel = new Pel(
            {              
                animal:animal,
                color:color,
                accesorio:accesorio,
                nombre:nombre
            }
        );

        let peluche = await pel.save(); 
        console.log("peluche nuevo");
        console.log(peluche);
        return { peluche }; 

    //}else{
    //    return false;
    //}
}   


const getAllPeluches = async (limit,offset) => {

    const peluches = await Pel.find({}).limit(limit).skip(offset);

    return peluches;
}

const getpeluche = async(id) => {

    const peluche = await Pel.findById(id);

    // await Usr.findOne({ _id: req.params.id })

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

module.exports = { addPeluche, getAllPeluches, getpeluche, editPeluche, deletePeluche} 