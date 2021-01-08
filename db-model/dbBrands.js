import mongoose from 'mongoose';

const brandsSchema = mongoose.Schema({
    name: String,
    link: String,
});

export default mongoose.model('brands', brandsSchema);