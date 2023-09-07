import mongoose from "mongoose";

const aboutSchema = mongoose.Schema({
  subIntro: {
    type: String,
    required: true,
  },
  introText: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("About", aboutSchema);
