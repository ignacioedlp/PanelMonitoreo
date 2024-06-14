import mongoose from 'mongoose';

const Item = new mongoose.Schema({
  
    datetime: String,
    humidity:Number,
    temperature:Number,
    zone:String
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Item || mongoose.model('Item', Item);
