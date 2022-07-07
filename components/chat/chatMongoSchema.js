const Joi = require('joi');
const moment = require('moment');
const { mongodb } = require('../../config/db');
const mongoose = require('mongoose');


mongoose.connect(mongodb.URL, mongodb.options);

const email = Joi.string().min(4).required();
const nombre = Joi.string().min(4).required();
const apellido = Joi.string().min(4).required();
const alias = Joi.string().min(4).required();
const edad = Joi.number().required();
const avatar = Joi.string().min(4).required();
const fecha = Joi.string().min(4).required();
const author = Joi.object({
    email: email,
    nombre: nombre,
    apellido: apellido,
    alias: alias,
    edad: edad,
    avatar: avatar,    
}).required();
const text = Joi.string().min(4).required();

const messageSchema = new mongoose.Schema({
    author: author,
    text: text,
    fecha: fecha
});

const Messages = mongoose.model('mensajes', messageSchema);

module.exports = Messages;










