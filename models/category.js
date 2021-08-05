const { Schema, model } = require('mongoose')

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    }
})

categorySchema.virtual('url').get(()=>'/category/'+this._id)

module.exports = model('CategoryModel', categorySchema)