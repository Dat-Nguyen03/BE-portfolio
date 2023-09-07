import mongoose from "mongoose";

const iconSchema = mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Icon", iconSchema);
