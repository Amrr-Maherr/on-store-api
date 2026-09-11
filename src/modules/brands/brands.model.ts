import mongoose from 'mongoose';

const { Schema } = mongoose;

const BrandSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Brand = mongoose.model('Brand', BrandSchema);

export default Brand;
