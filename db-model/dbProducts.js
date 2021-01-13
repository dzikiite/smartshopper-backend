import mongoose from 'mongoose';

export const productsSchema = mongoose.Schema({
    id: String,
    name: String,
    link: String,
    brand: String,
    price: Number,
    priority: Boolean,
})

export default mongoose.model('products', productsSchema);