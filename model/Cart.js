import mongoose from 'mongoose';
import User from './User.js';
import Product from './Product.js';
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    userId: { type: mongoose.ObjectID, ref: User },
    items: [
      {
        productId: { type: mongoose.ObjectID, ref: Product },
        size: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

cartSchema.methods.toJSON = function () {
  const obj = this._doc; //data 의 모든 정보를 가짐
  delete obj.__v; //version 삭제
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; // cartSchema 가 호출시 default 로 실행됨. 백엔드에서 불필요데이터 차단

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
