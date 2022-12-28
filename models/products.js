import mongoose from "mongoose";

const ProductsSchema = mongoose.Schema({
  id: Number,
  images: Array,
  title: String,
  description: String,
  price: Number,
  style: String,
  material: String,
  type: String,
  category: String,
  customized: Boolean,
});

const Products = mongoose.model("products", ProductsSchema);

export default Products;
