const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose

const personSchema = new Schema({
    email: String,
    password: String,
    name: String,
}, { collection: 'persons' })

personSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

personSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('persons', personSchema)