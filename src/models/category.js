import mongoose from "mongoose";
// import mongooseDelete from "mongoose-delete";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);
