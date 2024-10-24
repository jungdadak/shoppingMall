import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    sku: { type: String, required: true, unique: true }, //sku : stock keeping unit 재고 관리 단위
    name: { type: String, required: true },
    image: { type: String, required: true }, //이미지주소 저장이기에 String!
    category: { type: Array, required: true }, //카테고리는 여러개가 될 수 있기에 Array!
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Object, required: true }, //재고는 여러개의 정보가 필요하기에 Object!
    isDeleted: { type: Boolean, default: false }, //찐삭제는 데이터정합성을 위해 Boolean!
    status: { type: String, default: 'active' }, //상태는 active, inactive, deleted 세가지가 있기에 String!
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  const obj = this._doc; //data 의 모든 정보를 가짐
  delete obj.__v; //version 삭제
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; // productSchema 가 호출시 default 로 실행됨. 백엔드에서 불필요데이터 차단

const Product = mongoose.model('Product', productSchema);
export default Product;
