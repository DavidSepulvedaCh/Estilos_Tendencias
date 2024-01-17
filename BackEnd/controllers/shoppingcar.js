'user strict';
const mongoose = require('mongoose');
const ShoppingCar = require('../models/shoppingCar');
const Product = require('../models/product');

var controller = {
    // Obtener los productos del carrito de compras
    getContentCar: async function (req, res) {
        const { email } = req.body;

        console.log(email);
        try {
            // Buscar el carrito por userId
            const existingItem = await ShoppingCar.findOne({ email });

            if (existingItem) {
                return res.status(200).send({ 'ProductsCar': existingItem });
            } else {
                // Si el carrito no existe para ese user
                return res.status(404).send({ 'message': 'Carrito de compras no encontrado para este usuario' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ "message": "Error al obtener el carrito de compras" });
        }
    },


    // Agregar un producto al carrito de compras
    addProductCar: async function (req, res) {
        const { productID, quantity, email } = req.body;

        try {
            const product = await Product.findById(productID);
            if (!product) {
                return res.status(404).send({ "message": "Producto no encontrado" });
            }

            const itemTotal = quantity * product.price;

            // Verificar si el usuario ya tiene carrito
            let existingItem = await ShoppingCar.findOne({ email });

            if (existingItem) {
                // Si el carrito existe, verifica si el producto ya está en el carrito
                const productInCart = existingItem.products.find(p => p._id.toString() === product._id.toString());

                if (productInCart) {
                    // Si el producto ya está en el carrito, actualiza la cantidad y el total
                    productInCart.quantity += quantity;

                    // Actualiza la cantidad total del carrito
                    existingItem.quantity += quantity;
                    existingItem.total += itemTotal;

                    existingItem = await ShoppingCar.findOneAndUpdate(
                        { email },
                        { $set: existingItem },
                        { new: true }
                    );
                } else {
                    // Si el producto no está en el carrito, agrégalo
                    existingItem.products.push({ _id: product._id, quantity: quantity, price: product.price });

                    // Actualiza la cantidad total del carrito
                    existingItem.quantity += quantity;
                    existingItem.total += itemTotal;
                }

                // Guardar los cambios en el carrito existente
                await existingItem.save();
            } else {
                // Si el carrito no existe, crea uno nuevo
                const newItem = new ShoppingCar({
                    email: email,
                    quantity: quantity,
                    total: itemTotal,
                    products: [{ _id: product._id, quantity: quantity, price: product.price }]
                });

                // Guardar el nuevo carrito en la base de datos
                await newItem.save();
            }

            return res.status(200).send({ "message": "Producto agregado al carrito" });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ "message": "Error al obtener o guardar el producto en el carrito" });
        }
    },

    deleteProductCar: async function (req, res) { }
}

module.exports = controller;
