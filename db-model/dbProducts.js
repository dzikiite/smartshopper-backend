import mongoose from 'mongoose';

export const productsSchema = mongoose.Schema({
    name: String,
    link: String,
    brands: String,
    price: Number,
    priority: Boolean,
})

export default mongoose.model('products', productsSchema);