'use strict';

const Product = require('../models/product');
const fs = require('fs');

function formatProductForFrontend(product) {
    return {
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        image: "data:image/" + product.imageExtension + ";base64," + product.image,
    };
}

var controller = {

    saveProduct: async function (req, res) {

        console.log(req.file);

        // Verificar que los campos obligatorios estén presentes
        if (!req.body.name || !req.body.category || !req.body.description) {
            return res.status(400).send({ "message": "Los campos son obligatorios." });
        }

        console.log(req.body);

        var product = new Product();
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.price = req.body.price;

        // Verificar si se envió un archivo
        if (req.file) {
            try {
                const imageBuffer = req.file.buffer;
                const imageBase64 = imageBuffer.toString('base64');

                product.image = imageBase64;
                product.imageExtension = req.file.mimetype.split('/')[1];

            } catch (err) {
                console.error("Error al leer la imagen:", err);
                return res.status(500).send({ "message": "Error al leer la imagen." });
            }
        } else {
            console.error("No se ha subido ningún archivo");
            // Puedes enviar un mensaje de error al usuario o manejar la situación como prefieras
        }

        try {
            const productStored = await product.save();
            return res.status(200).send({ "message": "Producto registrado exitosamente", "product": productStored });
        } catch (err) {
            console.error("Error al registrar el producto:", err);
            return res.status(500).send({ "message": "Error al registrar el producto." });
        }
    },

    getProduct: async function (req, res) {
        var productID = req.params.id;
        if (productID == null) return res.status(404).send({ "message": "Inserte un ID" });
        try {
            const product = await Product.findById(productID);
            if (!product) {
                return res.status(404).send({ "message": "Producto no encontrado" });
            }

            const formattedProduct = formatProductForFrontend(product);

            return res.status(200).send({ "Product": formattedProduct });
        } catch (e) {
            return res.status(500).send({ "message": "Error al obtener el producto" });
        }
    },

    getAllProducts: async function (req, res) {
        try {
            const products = await Product.find();
            const formattedProducts = products.map(formatProductForFrontend);

            return res.status(200).send({ "Products": formattedProducts });
        } catch (e) {
            return res.status(500).send({ "message": "Error al obtener los productos." });
        }
    },



    updateProduct: async function (req, res) {
        const productID = req.params.id;
        const paramsUpdate = req.body;

        try {
            await Product.findByIdAndUpdate(productID, paramsUpdate);
            const updatedProduct = await Product.findById(productID);
            return res.status(200).send({ "Message": "Producto actualizado exitosamente.", "product": updatedProduct });
        } catch (e) {
            return res.status(500).send({ "message": "Error al actualizar el producto." });
        }
    },

    deleteProduct: async function (req, res) {
        const productID = req.params.id;
        try {
            const product = await Product.findById(productID);
            if (product) {
                await Product.deleteOne({ _id: productID });
                return res.status(200).send({ "message": "El producto se eliminó exitosamente." });
            } else {
                return res.status(404).send({ "message": "El producto no existe." });
            }
        } catch (e) {
            return res.status(500).send({ "message": "Error al eliminar el producto." });
        }
    },
}


module.exports = controller;
