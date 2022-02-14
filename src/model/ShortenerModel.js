import mongoose from 'mongoose';

const ShortenerSchema = mongoose.Schema(
  {
    hash: { type: String, required: true },
    link: { type: String, required: true },
    hits: { type: Number, default: 0 },
    expired: { type: Boolean, default: false },
    expiredDate: Date,
    metadata: [mongoose.Schema.Types.Mixed],
    name: String,
  },
  {
    timestamp: true,
  }
);

const ShortenerModel = mongoose.model('shortener', ShortenerSchema);

export default ShortenerModel;
