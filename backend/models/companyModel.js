import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  field: { type: String, required: true },
  imageUrl: { type: String },
  shipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "shippmentCompany" }]
}, { minimize: false });


const companyModel = mongoose.model("company",companySchema) || mongoose.models.company

export default companyModel;