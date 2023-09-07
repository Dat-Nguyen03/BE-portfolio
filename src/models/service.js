import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  startSide: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Service", serviceSchema);
