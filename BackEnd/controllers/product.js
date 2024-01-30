'use strict';

const Product = require('../models/product');
const sharp = require('sharp');


function formatProductForFrontend(product) {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: "data:image/" + product.imageExtension + ";base64," + product.image,
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

    saveProduct: async function (req, res) {

        if (!req.body.name || !req.body.category || !req.body.description) {
            return res.status(400).send({ "message": "Los campos son obligatorios." });
        }

        var product = new Product();
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.price = req.body.price;
        product.stock = req.body.stock;

        if (req.file) {
            try {
                const { image } = await processImage(req.file.buffer);
                product.image = image;
                product.imageExtension = req.file.mimetype.split('/')[1];

            } catch (err) {
                return res.status(500).send({ "message": "Error al leer la imagen." });
            }
        } else {
            return res.status(400).send({ "message": "No se subio ninguna imagen." });
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
        console.log('llego al update');
        const productID = req.params.id;
        const paramsUpdate = req.body;
        console.log(paramsUpdate);
        try {
            let updatedProduct;
            if (req.file) {
                try {
                    const { image } = await processImage(req.file.buffer);
                    paramsUpdate.image = image;
                    paramsUpdate.imageExtension = req.file.mimetype.split('/')[1];
                } catch (err) {
                    console.log('error sin imagen')
                    return res.status(500).send({ "message": "Error al procesar la nueva imagen." });
                }
            }

            await Product.findByIdAndUpdate(productID, paramsUpdate);
            updatedProduct = await Product.findById(productID);

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
