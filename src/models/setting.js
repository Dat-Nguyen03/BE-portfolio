import mongoose from "mongoose";

const settingSchema = mongoose.Schema({
  logoTitle: {
    type: String,
    required: true,
  },
  bigTitle: {
    type: String,
    required: true,
  },
  smallTitle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  copyRight: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Setting", settingSchema);
