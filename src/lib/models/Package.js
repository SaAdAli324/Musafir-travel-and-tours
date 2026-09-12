import mongoose from 'mongoose';

const RoutePlanSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const PackageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tagline: { type: String },
  type: { type: String },
  badge: { type: String },
  duration: {
    days: { type: Number },
    nights: { type: Number }
  },
  pricing: {
    solo: { type: Number },
    couple: { type: Number },
    currency: { type: String, default: 'PKR' }
  },
  departure: { type: String },
  poster: { type: String },
  image: { type: String },
  attractions: [{ type: String }],
  routePlan: [RoutePlanSchema],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  menu: {
    breakfast: [{ type: String }],
    dinner: [{ type: String }]
  },
  addons: [{
    service: String,
    rates: Number,
    unit: String,
    description: String
  }]
}, { collection: 'packages' });

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
