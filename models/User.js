import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: String, default: 'customer' },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc; //data 의 모든 정보를 가짐
  delete obj.password; //password는 삭제 프론트엔드 못믿음.
  delete obj.__v; //version 삭제
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}; // userSchema 가 호출시 default 로 실행됨. 백엔드에서 불필요데이터 차단

const User = mongoose.model('User', userSchema);
export default User;
