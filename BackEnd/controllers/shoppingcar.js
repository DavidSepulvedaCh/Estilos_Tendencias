"user strict";
const mongoose = require("mongoose");
const ShoppingCar = require("../models/shoppingCar");
const Product = require("../models/product");

var controller = {
  // Obtener los productos del carrito de compras
  getContentCar: async function (req, res) {
    const { email } = req.body;

    console.log(email);
    try {
      // Buscar el carrito por userId
      const existingItem = await ShoppingCar.findOne({ email });

      if (existingItem) {
        return res.status(200).send({ ProductsCar: existingItem });
      } else {
        // Si el carrito no existe para ese user
        return res.status(404).send({
          message: "Carrito de compras no encontrado para este usuario",
        });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Error al obtener el carrito de compras" });
    }
  },

  // Agregar un producto al carrito de compras
  addProductCar: async function (req, res) {
    const { productID, quantity } = req.body;
    const email = req.email;

    console.log(productID, quantity, email);

    try {
      const product = await Product.findById(productID);
      if (!product) {
        return res.status(404).send({ message: "Producto no encontrado" });
      }

      const itemTotal = quantity * product.price;

      let existingItem = await ShoppingCar.findOne({ email });

      if (existingItem) {
        const productInCart = existingItem.products.find(
          (p) => p._id.toString() === product._id.toString()
        );

        if (productInCart) {
          productInCart.quantity += quantity;

          existingItem.quantity += quantity;
          existingItem.total += itemTotal;

          existingItem = await ShoppingCar.findOneAndUpdate(
            { email },
            { $set: existingItem },
            { new: true }
          );
        } else {
          existingItem.products.push({
            _id: product._id,
            quantity: quantity,
            price: product.price,
          });

          existingItem.quantity += quantity;
          existingItem.total += itemTotal;
        }

        await existingItem.save();
      } else {
        const newItem = new ShoppingCar({
          email: email,
          quantity: quantity,
          total: itemTotal,
          products: [
            { _id: product._id, quantity: quantity, price: product.price },
          ],
        });

        await newItem.save();
      }

      return res.status(200).send({ message: "Producto agregado al carrito" });
    } catch (e) {
      console.error(e);
      return res.status(500).send({
        message: "Error al obtener o guardar el producto en el carrito",
      });
    }
  },

  deleteProductCar: async function (req, res) {
    const { email, productID, quantity, isAll } = req.body;

    try {
      if (!email || (isAll === undefined && !productID)) {
        return res.status(400).send({
          success: false,
          message: "Todos los campos son requeridos.",
        });
      }

      // Buscar el carrito por email antes de realizar las operaciones
      let existingItem = await ShoppingCar.findOne({ email });

      if (!existingItem) {
        return res.status(404).send({
          success: false,
          message: "Usuario no encontrado o carrito vacío",
        });
      }

      let updateQuery;

      if (isAll) {
        // Eliminar todo el registro del carrito
        await ShoppingCar.deleteOne({ email });
        return res
          .status(200)
          .send({ success: true, message: "Carrito eliminado correctamente" });
      } else if (productID) {
        const productIndex = existingItem.products.findIndex(
          (p) => p._id.toString() === productID.toString()
        );

        if (productIndex !== -1) {
          if (
            quantity &&
            quantity > 0 &&
            quantity < existingItem.products[productIndex].quantity
          ) {
            // Reducir la cantidad del producto en lugar de eliminarlo completamente
            existingItem.products[productIndex].quantity -= quantity;
            updateQuery = { $set: { products: existingItem.products } };
          } else {
            // Eliminar completamente el producto
            existingItem.products.splice(productIndex, 1);
            updateQuery = { $set: { products: existingItem.products } };
          }
        } else {
          return res.status(404).send({
            success: false,
            message: "Producto no encontrado en el carrito",
          });
        }
      }

      // Actualizar la cantidad global del carrito
      existingItem.quantity = existingItem.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      existingItem.total = existingItem.products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
      await existingItem.save();

      // Actualizar el documento en la base de datos
      await ShoppingCar.findOneAndUpdate({ email }, updateQuery);

      return res.status(200).send({
        success: true,
        message: "Producto(s) eliminado(s) correctamente del carrito",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ success: false, message: "Error interno del servidor" });
    }
  },
};

module.exports = controller;
