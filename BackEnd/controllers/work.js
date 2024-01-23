'use strict';

const Work = require('../models/work');

var controller = {

    /* Obtener los servicios */
    getAllServices: async function (req, res) {
        try {
            const works = await Work.find();
            return res.status(200).send({ "Works": works });
        } catch (e) {
            return res.status(500).send({ "message": "Error al obtener los servicios." });
        }
    },

    /* Registrar servicio en la BD */
    addService: async function (req, res) {
        const { name, description, category, image } = req.body;
        if (name && description && category) {
            try {
                var work = new Work();
                work.name = name;
                work.description = description;
                work.category = category;
                work.image = image;
                const workStored = await work.save();
                if (workStored) {
                    res.status(200).send({ "Message": "El servicio fue registrado exitosamente en la BD." });
                } else {
                    res.status(500).send({ "Message": "Error al registrar el servicio en la BD." });
                }
            } catch (error) {
                res.status(500).send({ "Message": error });
            }
        } else {
            res.status(500).send({ "Message": "Todos los campos son requeridos." })
        }
    },

    /* Actualizar servicio */

    updateService: async function (req, res) {
        const serviceID = req.params.id;
        const paramsUpdate = req.body;
        try {
            await Work.findByIdAndUpdate(serviceID, paramsUpdate);
            return res.status(200).send({ "Message": "Servicio actualizado exitosamente.", "product": paramsUpdate });
        } catch (e) {
            return res.status(500).send({ "message": "Error al actualizar el servicio." });
        }
    },

    /* Eliminar Servicio */
    deleteService: async function (req, res) {
        const serviceID = req.params.id;
        try {
            const work = await Work.findById(serviceID);
            if (work) {
                await Work.deleteOne({ _id: serviceID });
                return res.status(200).send({ "message": "El servicio se eliminó exitosamente." });
            } else {
                return res.status(404).send({ "message": "El servicio no existe." });
            }
        } catch (e) {
            return res.status(500).send({ "message": "Error al eliminar el servicio." });
        }
    },

};

module.exports = controller;