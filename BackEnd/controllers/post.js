'use strict';

const Post = require('../models/post');
const sharp = require('sharp');

function formatPostForFrontend(post) {
    return {
        id: post.id,
        name: post.name,
        description: post.description,
        image: "data:image/" + post.imageExtension + ";base64," + post.image,
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
    savePost: async function (req, res) {

        if (!req.body.name || !req.body.description ) {
            return res.status(400).send({ "message": "Los campos son obligatorios." });
        }

        var post = new Post();
        post.name = req.body.name;
        post.description = req.body.description;

        if (req.file) {
            try {
                const { image } = await processImage(req.file.buffer);
                post.image = image;
                post.imageExtension = req.file.mimetype.split('/')[1];

            } catch (err) {
                return res.status(500).send({ "message": "Error al leer la imagen." });
            }
        } else {
            return res.status(400).send({ "message": "No se subio ninguna imagen." });
        }

        try {
            const postStored = await post.save();
            return res.status(200).send({ "message": "Publicación registrada exitosamente", "post": postStored });
        } catch (err) {
            console.error("Error al registrar la publicación:", err);
            return res.status(500).send({ "message": "Error al registrar la publicación." });
        }
    },

    getAllPosts: async function (req, res) {
        try {
            const post = await Post.find();
            const formattedpost = post.map(formatPostForFrontend);

            return res.status(200).send({ "posts": formattedpost });
        } catch (e) {
            return res.status(500).send({ "message": "Error al obtener las publicaciones." });
        }
    },

    deletePost: async function (req, res) {
        const postID = req.params.id;
        try {
            const post = await post.findById(postID);
            if (post) {
                await post.deleteOne();
                return res.status(200).send({ "message": "La publicación se eliminó exitosamente." });
            } else {
                return res.status(404).send({ "message": "La publicación no existe." });
            }
        } catch (e) {
            console.error("Error al eliminar La publicación:", e); 
            return res.status(500).send({ "message": "Error al eliminar La publicación." });
        }
    },
    
}

module.exports = controller;
