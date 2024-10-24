import mongoose from 'mongoose';
import Product from './Product.js';
import User from './User.js';

const Schema = mongoose.Schema;
const orderSchema = Schema({
  shipTo: { type: Object, required: true },
  contact: { type: Object, required: true },
  userId: { type: mongoose.ObjectID, ref: User },
  status: { type: String, default: 'not yet' },
  orderID: { type: String },
  items: [
    {
      productId: { type: mongoose.ObjectId, ref: Product, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true, default: 1 },
      size: { type: String, required: true },
    },
  ],
});

orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const Order = mongoose.model('Order', orderSchema);
export default Order;
