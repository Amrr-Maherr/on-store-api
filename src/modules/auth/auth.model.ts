import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        phoneNumber: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, minlength: 6 },
        role: { type: String, enum: ['merchant', 'admin'], default: 'merchant' },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model('User', UserSchema);

export default User;
