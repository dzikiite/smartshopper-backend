import mongoose from 'mongoose';

export const usersSchema = mongoose.Schema({
    login: String,
    password: String,
})

export default mongoose.model('users', usersSchema);