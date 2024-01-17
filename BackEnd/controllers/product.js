'use strict';

const Product = require('../models/product');

var controller = {

    saveProduct: async function (req, res) {

        var params = req.body;
        var product = new Product();
        product.name = params.name;
        product.description = params.description;
        product.category = params.category;
        product.price = params.price;
        product.image = null;

        try {
            const productStored = await product.save();
            //this.uploadImage;
            return res.status(200).send({ "message": "Producto registrado exitosamente", "product": productStored });
        } catch (err) {
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
            return res.status(200).send({ "Product": product });
        } catch (e) {
            return res.status(500).send({ "message": "Error al obtener el producto" });
        }
    },

    getAllProducts: async function (req, res) {
        try {
            const products = await Product.find();
            return res.status(200).send({ "Products": products });
        } catch (e) {
            return res.status(500).send({ "message": "Error al obtener los productos." });
        }
    },

    updateProduct: async function (req, res) {
        const productID = req.params.id;
        const paramsUpdate = req.body;
        try {
            await Product.findByIdAndUpdate(productID, paramsUpdate);
            return res.status(200).send({ "Message": "Producto actualizado exitosamente.", "product": paramsUpdate });
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

    uploadImage: async function (req, res) {
        const productID = req.params.id;
        var fileName = 'img no subida...';
        try {
            if (req.file) {
                var filePath = req.file.path;
                var fileSplit = filePath.split('\\');
                fileName = fileSplit[fileSplit.length - 1];

                const productUp = await Product.findByIdAndUpdate(productID, { "image": fileName }, { new: true });
                if (!productUp) {
                    return res.status(404).send({ "message": "No existe producto." });
                }

                return res.status(200).send({
                    "message": "Imagen subida correctamente.",
                    "product": productUp
                });
            } else {
                return res.status(200).send({
                    "message": fileName
                });
            }
        } catch (e) {
            return res.status(500).send({ "message": e.message });
        }
    }
}


module.exports = controller;
