import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoURI = process.env.LOCAL_DB_ADRESS;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Mongoose working'))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5001, () => {
  console.log('server on');
});
