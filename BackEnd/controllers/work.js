'use strict';

const Work = require('../models/work');
const sharp = require('sharp');

const multer = require('multer');
const upload = multer();

function formatServiceForFrontend(service) {
    return {
        id: service.id,
        name: service.name,
        description: service.description,
        category: service.category,
        image: "data:image/" + service.imageExtension + ";base64," + service.image,
    };
}

async function processImage(imageBuffer) {
    try {
        const compressedImageBuffer = await sharp(imageBuffer)
            .resize({ width: 800, height: 600 })
            .jpeg({ quality: 70 })
            .toBuffer();

        const imageBase64 = compressedImageBuffer.toString('base64');

        return { image: imageBase64 };
    } catch (err) {
        throw new Error("Error al procesar la imagen.");
    }
}

var controller = {

    /* Obtener los servicios */
    getAllServices: async function (req, res) {
        try {
            const works = await Work.find();
            const formattedServices = works.map(formatServiceForFrontend);
            return res.status(200).send({ "Works": formattedServices });
        } catch (e) {
            return res.status(500).send({ "message": "Error al obtener los servicios." });
        }
    },

    /* Registrar servicio en la BD */
    addService: async function (req, res) {
        if (!req.body.name || !req.body.category || !req.body.description) {
            return res.status(400).send({ "message": "Los campos son obligatorios." });
        }

        var service = new Work();
        service.name = req.body.name;
        service.description = req.body.description;
        service.category = req.body.category;
        console.log(service);

        if (req.file) {
            try {
                const { image } = await processImage(req.file.buffer);
                service.image = image;
                service.imageExtension = req.file.mimetype.split('/')[1];
            } catch (err) {
                return res.status(500).send({ "message": "Error al leer la imagen." });
            }
        } else {
            return res.status(400).send({ "message": "No se subió ninguna imagen." });
        }

        try {
            const serviceStored = await service.save();
            return res.status(200).send({ "message": "Servicio registrado exitosamente", "service": serviceStored });
        } catch (err) {
            console.error("Error al registrar el servicio:", err);
            return res.status(500).send({ "message": "Error al registrar el servicio." });
        }
    },


    /* Actualizar servicio */
    updateService: async function (req, res) {
        const serviceID = req.params.id;
        const paramsUpdate = req.body;

        try {
            if (req.file) {
                try {
                    const { image } = await processImage(req.file.buffer);
                    paramsUpdate.image = image;
                    paramsUpdate.imageExtension = req.file.mimetype.split('/')[1];
                } catch (err) {
                    return res.status(500).send({ "message": "Error al procesar la nueva imagen." });
                }
            }

            const updatedService = await Work.findByIdAndUpdate(serviceID, paramsUpdate, { new: true });
            return res.status(200).send({ "Message": "Servicio actualizado exitosamente.", "service": updatedService });
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