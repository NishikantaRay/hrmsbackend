
import mongoose from 'mongoose';

const userAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',

    },
    uuid : {
      type : String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    isPrimary_add: {
      type: Boolean,
      default: false
    }
  },{timestamps: true})


const Address = mongoose.model('Address', userAddressSchema);
export default Address;

