import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
      
    },

    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
      
    },

    email: {
      type: String,
      lowercase: true,  
      unique: true,
      required: [true, 'Please enter email'],
    },

    password:  {type:String},

    phoneNumber: {
      type: String,
      unique: true,
    },

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
