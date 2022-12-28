import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
  id: String,
  time: String,
  orderedBy: String,
  userData: {
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
  },
  carts: Array,
  totalAmount: String,
  note: String,
  status: String,
});

const Cart = mongoose.model("cart", CartSchema);

export default Cart;
