import mongoose from "mongoose";

function generateRandomId() {
  return Math.floor(Math.random() * 9000000000) + 100000000;
}

const shippmentSchema = new mongoose.Schema({
  number: { type: Number, unique: true, default: generateRandomId },
  status: { type: String, default: "Not moved yet" },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  package_details: { type: String },
  transition: { type: String, default: "Not moved yet" },
  transition_date: { type: Date },
  arrived: { type: String, default: "Not moved yet" },
  arrived_date: { type: Date },
  picked_up: { type: String, default: "Not moved yet" },
  picked_up_date: { type: Date },
  courier: { type: String },
  estimated_delivery: { type: Date },
},{minimize:false});

const shippmentModel = mongoose.model("shippment", shippmentSchema);
export default shippmentModel;

