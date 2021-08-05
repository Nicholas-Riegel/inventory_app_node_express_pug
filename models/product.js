const { Schema, model } = require('mongoose')

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

productSchema.virtual('url').get(() => '/category/' + this.categoryId + '/product/' + this._id)

module.exports = model('ProductModel', productSchema)