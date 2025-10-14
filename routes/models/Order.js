const mongoose = require("mongoose");
MONGO_URI=('mongodb+srv://shivakoshti121_db_user:Shiva%40123@cluster0.di5bvgc.mongodb.net/crafting_world?retryWrites=true&w=majority&appName=Cluster0')
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  product: String,
  quantity: Number,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
