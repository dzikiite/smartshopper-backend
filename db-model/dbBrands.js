import mongoose from 'mongoose';

const brandsSchema = mongoose.Schema({
    id: String,
    name: String,
    link: String,
});

export default mongoose.model('brands', brandsSchema);