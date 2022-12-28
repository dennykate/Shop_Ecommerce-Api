import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  birthDate: String,
  region: String,
  gender: String,
  email: String,
  password: String,
  totalCost: Array,
});

const User = mongoose.model("user", UserSchema);

export default User;
