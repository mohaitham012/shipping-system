import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
 name: { type: String, required: true },
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 imageUrl: { type: String },
 shipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "shippment" }],
});
const userModel = mongoose.model("user", userSchema) || mongoose.models.user;
export default userModel;