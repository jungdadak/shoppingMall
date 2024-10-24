import mongoose from 'mongoose';
import Product from './Product.js';
import Cart from './Cart.js';
import User from './User.js';

const Schema = mongoose.Schema;
const orderSchema = Schema({
  shipTo: { type: String, required: true },
  contact: { type: String, required: true },
  userId: { type: mongoose.ObjectID, ref: User },
  items: [
    {
      productId: { type: mongoose.ObjectID, ref: Product },
      size: { type: mongoose.Cart, ref: Cart },
      quantity: { type: mongoose.Cart, ref: Cart },
      price: { type: Number, required: true }, //주문시 가격이 바뀔 수 있기에 필요
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
