'use strict';

const Supplier = require('../models/supplier');
const sharp = require('sharp');

function formatSupplierForFrontend(supplier) {
    return {
        id: supplier.id,
        name: supplier.name,
        category: supplier.category,
        image: "data:image/" + supplier.imageExtension + ";base64," + supplier.image,
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


var controller ={
    saveSupplier: async function (req, res) {
        console.log(req.body);
        if (!req.body.name || !req.body.category ) {
            return res.status(400).send({ "message": "Los campos son obligatorios." });
        }

        var supplier = new Supplier();
        supplier.name = req.body.name;
        supplier.category = req.body.category;

        if (req.file) {
            try {
                const { image } = await processImage(req.file.buffer);
                supplier.image = image;
                supplier.imageExtension = req.file.mimetype.split('/')[1];

            } catch (err) {
                return res.status(500).send({ "message": "Error al leer la imagen." });
            }
        } else {
            return res.status(400).send({ "message": "No se subio ninguna imagen." });
        }

        try {
            const supplierStored = await supplier.save();
            return res.status(200).send({ "message": "Proovedor registrado exitosamente", "supplier": supplierStored });
        } catch (err) {
            console.error("Error al registrar el proovedor:", err);
            return res.status(500).send({ "message": "Error al registrar el proovedor." });
        }
    },

    getAllSuppliers: async function (req, res) {
        try {
            const supplier = await Supplier.find();
            const formattedSupplier = supplier.map(formatSupplierForFrontend);

            return res.status(200).send({ "Suppliers": formattedSupplier });
        } catch (e) {
            return res.status(500).send({ "message": "Error al obtener los proovedores." });
        }
    },

    deleteSupplier: async function (req, res) {
        const supplierID = req.params.id;
        try {
            const supplier = await Supplier.findById(supplierID);
            if (supplier) {
                await supplier.deleteOne();
                return res.status(200).send({ "message": "El proveedor se eliminó exitosamente." });
            } else {
                return res.status(404).send({ "message": "El proveedor no existe." });
            }
        } catch (e) {
            console.error("Error al eliminar el proveedor:", e); 
            return res.status(500).send({ "message": "Error al eliminar el proveedor." });
        }
    },
    
}

module.exports = controller;
